import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Cart from './cart';
import * as cartAPI from './api/cart';
import * as orderAPI from './api/order';
import localCache from './localCache';
import './App.css';

const shippingOptions = [
  {
    "shippingOptionId" : 1,
    "name": "Standard delivery",
    "price": {
      "currency" : "EUR",
      "amount" : 9.99 
    },
    "description" : "Delivery times may vary, depending on your country's postal carrier.",
    "default" : true
  },
  {
    "shippingOptionId" : 2,
    "name": "Courier",
    "price": {
      "currency" : "EUR",
      "amount" : 14.99 
    },
    "description" : "Delivery is made within 2-5 business days of order date."
  }
];

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipping : 9.99
    };
  }

  completeOrderHandler = async () => {
    let cart = localCache.getCart();
    await orderAPI.newOrder(cart._id);
    localStorage.removeItem('cart');
    this.props.history.push('/complete');
  }

  shippingOptionSelectHandler = (option) => {
    this.setState({"shipping": option.price.amount});
  }

  render() {

    return (
        <div className="row">
          <main className="col-md-8" role="main">
            <h4>Shopping Cart</h4>
            <Cart isCheckout = {true} {...this.props}/>
            <h5>Shipping Options</h5>
            <ShippingOptions shippingOptionSelectHandler={this.shippingOptionSelectHandler} options={shippingOptions} />
          </main>
          <aside className="col-md-4">
            <OrderSummary shippingCosts={this.state.shipping}/>
            <CompleteOrderButton completeOrderHandler={this.completeOrderHandler}/>
          </aside>
        </div>
    );
  }
}

const ShippingOption = ({option, shippingOptionSelectHandler}) => {

  const handleShippingOptionChange = (e) => {
    shippingOptionSelectHandler(option);
  }

  return (
    <div className="form-check mb-3">
      <label className="form-check-label">
        <input className="form-check-input" type="radio" name="shippingRadios" 
                      id={`shippingRadio-${option.shippingOptionId}`} 
                      value={option.price.amount} 
                      onChange={handleShippingOptionChange} 
                      defaultChecked={option.default} />
        {option.name} <strong>{option.price.currency} {option.price.amount}</strong>
      </label>
      <p className="text-muted">{option.description}</p>
    </div>
  );
}

const ShippingOptions = ({options, shippingOptionSelectHandler}) => {

  let shippingOptions = options.map(
    (o) => <ShippingOption key={o.shippingOptionId} option={o}
                           shippingOptionSelectHandler={shippingOptionSelectHandler} />
  )

  return (
    <div id="shipping-options">
      <div className="card mb-3">
        <div className="card-body p-2">
          <p className="mb-4">Please choose the prefered shipping method for your order, from the options below</p>
          <form>
            {shippingOptions}
          </form>
        </div>
      </div>
    </div>
  );
}

class OrderSummary extends Component {
  
  async componentDidMount() {
    let cart = null;
    const cartId = localStorage.getItem('cart'); // do we have an existing cart
    
    if (cartId) {
      cart = await cartAPI.getCart(cartId);
    } else {
      cart = await cartAPI.newCart(); // retrieve new cart
      localStorage.setItem('cart', cart._id);
    }
    localCache.setCart(cart);
    this.setState({});
  }

  render() {
    let cart = localCache.getCart();
    
    let total = cart.items.reduce(
      (sum, i) => (sum += i.quantity * i.product.price.amount), 0);
      
      return (
        <div id="order-summary">
          <h5>Order Summary</h5>
          <div className="card bg-light mb-3">
            <div className="card-body p-2">
              <ul className="list-unstyled">
                <li className="list-unstyled d-flex flex-row justify-content-between align-items-start">
                  <p className="w-75">Items</p>
                  <p>EUR&nbsp;{Number(total).toFixed(2)}</p>
                </li>
                <li className="list-unstyled d-flex flex-row justify-content-between align-items-start">
                  <p className="w-75">Shipping &amp; Handling</p>
                  <p>EUR&nbsp;{this.props.shippingCosts}</p>
                </li>
                <li className="list-unstyled d-flex flex-row justify-content-between align-items-start mt-2 pt-3 border-top">
                  <strong className="w-75">Order Total</strong>
                  <strong>EUR&nbsp;{Number(total + this.props.shippingCosts).toFixed(2)}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
  }  
}

const CompleteOrderButton = ({completeOrderHandler}) => {

  const handleClick = (e) => {
    completeOrderHandler();
  }

  return (
      <button type="button" className="btn btn-primary btn-lg btn-block" 
              onClick={handleClick}>Complete your Order</button>
  );
}

export default Checkout;
