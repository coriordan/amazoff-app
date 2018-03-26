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
  let disabled = (items.length === 0);
  let total = items.reduce(
              (sum, i) => (sum += i.quantity * i.price.amount), 0);

  return (

    <div id="order-summary">
      <h5>Order Summary</h5>
      <div className="card bg-light mb-3">
        <div className="card-body">
          <dl className="row">
            <dt className="col-md-8">Items</dt>
            <dd className="col-md-4">EUR&nbsp;{Number(total).toFixed(2)}</dd>
            <dt className="col-md-8">Shipping &amp; Handling</dt>
            <dd className="col-md-4">EUR&nbsp;{shippingCosts}</dd>
            <dt className="col-md-8">Order Total</dt>
            <dd className="col-md-4">EUR&nbsp;{Number(total+shippingCosts).toFixed(2)}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
