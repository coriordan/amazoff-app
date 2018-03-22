import React from 'react';
import './App.css';

const Cart = ({cart, removeHandler, 
                     updateQuantityHandler}) => {
  let cartItems = cart.map(
    (i) => <CartItem key={i.id} item={i} 
                     removeHandler={removeHandler} 
                     updateQuantityHandler={updateQuantityHandler}/>
  );

  return (
    <div id="shoping-cart" className="card">
      <div className="card-body">
        {
          cart.length === 0 && (
            <p>Your cart is empty</p>
          )
        }
        <ul className="list-unstyled">
          {cartItems}
        </ul>
        <hr/>
        <CartTotal items={cart} />
      </div>
    </div>
  );
}

const CartTotal = ({items}) => {
  let total = items.reduce(
              (sum, i) => (sum += i.quantity * i.price.amount), 0);
  return (
    <div className="d-flex justify-content-between align-items-center"> 
      <span className="mr-auto">Sub total:</span>
          <strong className="pr-3">EUR&nbsp;{Number(total).toFixed(2)}</strong>
      <button type="button" className="btn btn-primary btn-sm">Checkout</button>
    </div>
  );
}

const CartItem = ({item, removeHandler, 
                          updateQuantityHandler}) => {
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

export default Cart;