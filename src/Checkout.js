import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import cartAPI from './test/cartAPI';
import Cart from './cart';
import './App.css';

class Checkout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let cart = cartAPI.getCartContents();
    
    return (
        <div className="row">
          <main className="col-md-8" role="main">
            <h4>Shopping Cart</h4>
            <Cart cart={cart} 
                removeHandler={this.removeFromCart} 
                  updateQuantityHandler={this.updateQuantity} 
                  isCheckout = {true}
                  {...this.props}/>
          </main>
          <aside className="col-md-4">
                  <OrderSummary items={cart} shippingCosts={this.props.shippingCosts}/>
          </aside>
        </div>
    );
  }
}

Checkout.defaultProps = {
  shippingCosts : 9.99
};

const OrderSummary = ({items, shippingCosts}) => {
  let total = items.reduce(
              (sum, i) => (sum += i.quantity * i.price.amount), 0);

  return (
    <div id="order-summary">
      <h5>Order Summary</h5>
      <div className="card bg-light mb-3">
        <div className="card-body">
          <ul className="list-unstyled">
            <li className="list-unstyled d-flex flex-row justify-content-between align-items-start">
              <p className="w-75">Items</p>
              <p>EUR&nbsp;{Number(total).toFixed(2)}</p>
            </li>
            <li className="list-unstyled d-flex flex-row justify-content-between align-items-start">
              <p className="w-75">Shipping &amp; Handling</p>
              <p>EUR&nbsp;{shippingCosts}</p>
            </li>
            <li className="list-unstyled d-flex flex-row justify-content-between align-items-start mt-2 pt-3 border-top">
              <strong className="w-75">Order Total</strong>
              <strong>EUR&nbsp;{Number(total+shippingCosts).toFixed(2)}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
