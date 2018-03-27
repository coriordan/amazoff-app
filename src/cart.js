import React, { Component } from 'react';
import './App.css';

class Cart extends Component {
  constructor(props) {
    super(props);
  }
     
  handleCheckout = () => {
    this.props.history.push('/checkout');
  }
  
  render() {
    let CartItemComponent = CartItem;
    this.props.isCheckout && (CartItemComponent = CheckoutCartItem);
    
    let cartItems = this.props.cart.map(
      (i) => <CartItemComponent key={i.id} item={i} 
                       {...this.props} />
    );
    
    return (
      <div id="shoping-cart" className="card mb-3">
        <div className="card-body p-2">
          {
            this.props.cart.length === 0 && (
              <p>Your cart is empty</p>
            )
          }
          <ul className="list-unstyled">
            {cartItems}
          </ul>
          {
            this.props.isCheckout === false && (
            [
              <hr/>,
              <CartTotal items={this.props.cart} 
                         checkoutHandler={this.handleCheckout} />
            ]
          )
        }
        </div>
      </div>
    );
  }
}

Cart.defaultProps = {
  isCheckout : false
};

const CartTotal = ({items, checkoutHandler}) => {
  let disabled = (items.length === 0);
  let total = items.reduce(
              (sum, i) => (sum += i.quantity * i.price.amount), 0);
  
  const handleCheckoutClick = (e) => {
    e.preventDefault();
    checkoutHandler();
  }
  
  return (
    <div className="d-flex justify-content-between align-items-center"> 
      <span className="mr-auto">Sub total:</span>
          <strong className="pr-3">EUR&nbsp;{Number(total).toFixed(2)}</strong>
      <button type="button" className="btn btn-primary btn-sm" 
              disabled={disabled} onClick={handleCheckoutClick}>Checkout</button>
    </div>
  );
}

const CartItem = ({item, removeHandler, updateQuantityHandler}) => {
  const handleRemove = (e) => {
    e.preventDefault();
    removeHandler(item.id);
  }
  
  const handleUpdateQuantity = (e) => {
    e.preventDefault();
    updateQuantityHandler(item.id, e.target.value);
  }

  return (
    <li className="media cart-item my-4">
      <img className="cart-item__image mr-3" src={item.imageUrl} alt={item.title}/>
      <div className="media-body d-flex flex-row justify-content-between align-items-start">
        <div className="w-50">
          <h6 className="cart-item__title mt-0 mb-1">{item.title} ({item.format})</h6>
          <div className="cart-item__meta text-muted">by {item.author}</div>
        </div>
        <div className="cart-item__meta text-muted">{item.price.currency + ' ' + 
                                                       Number(item.price.amount).toFixed(2)}</div>
          <select id="cart-item__quantity" value={item.quantity} 
                  className="form-control form-control-sm" style={{width: '15%'}}
                  onChange={handleUpdateQuantity}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button type="button" className="close" aria-label="Close" onClick={handleRemove}>
            <span aria-hidden="true">&times;</span>
          </button>
      </div>
    </li>
  );
}

const CheckoutCartItem = ({item}) => {
  return (
    <li className="media cart-item my-4">
      <img className="cart-item__image--large mr-3" src={item.imageUrl} alt={item.title}/>
      <div className="media-body">
          <h6 className="cart-item__title mt-0 mb-1">{item.title} ({item.format})</h6>
          <div className="cart-item__meta text-muted">by {item.author}</div>
          <div className="cart-item__meta text-muted">{item.price.currency + ' ' + 
                                                       Number(item.price.amount).toFixed(2)}</div>
          <div className="cart-item__meta text-muted">x {item.quantity}</div>
      </div>
    </li>
  );
}

export default Cart;