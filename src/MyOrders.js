import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import dateFormat from 'dateformat';
import './App.css';
import * as orderAPI from './api/order';
import localCache from './localCache';


const OrderTotal = ({entries}) => {
  let total = entries.reduce(
              (sum, e) => (sum += e.quantity * e.product.price.amount), 0);

  return (
    <div className="d-flex justify-content-end align-items-end"> 
      <span className="mr-2">Total:</span>
      <strong>EUR&nbsp;{Number(total).toFixed(2)}</strong>
    </div>
  );
}

const OrderItemEntry = ({entry}) => {

    return (
       <li className="media my-4">
        <img className="cart-item__image mr-3" src={entry.product.imageUrl} alt={entry.product.title}/>
          <div className="media-body d-flex flex-row justify-content-between align-items-start">
            <div className="w-50">
              <h6 className="cart-item__title mt-0 mb-1">{entry.product.title}</h6>
              <div className="cart-item__meta text-muted">by {entry.product.authors[0]}</div>
              <div className="cart-item__meta text-muted">x {entry.quantity}</div>
            </div>
          <div className="cart-item__meta text-muted">{entry.product.price.currency + ' ' + 
                                                       Number(entry.product.price.amount * entry.quantity).toFixed(2)}</div>
          
        </div>
       </li>
    );
}

const OrderItem = ({item}) => {

  let orderItemEntries = item.items.map(
    (e) => <OrderItemEntry key={e._id} entry={e} />
  );
  
  let orderDate = dateFormat(Date.parse(item.createdAt), "dddd, mmmm dS, yyyy, h:MM:ss TT");
  
  return (
    <li className="list-group-item">
      <p>
        <small className="text-muted">Order number: {item._id} </small><br/>
        <small className="text-muted">Order created on: {orderDate}</small><br/>
        <span className="badge badge-success">Shipped</span>
      </p>
      
      <ul className="list-unstyled">
        {orderItemEntries}
      </ul>
      
      <OrderTotal entries={item.items} />  
        
    </li>
  );
}

class MyOrders extends Component {
  
  async componentDidMount() {
    const orders = await orderAPI.getAll();
    localCache.setOrders(orders);
    this.setState({});
  }
  
  render() {
    let orders = localCache.getOrders();
    
    let orderItems = orders.map(
      (i) => <OrderItem key={i._id} item={i} {...this.props} />
    );
    
    return (
      <div className="row">
        <main className="col-md-12 mb-5" role="main">
          <header className="d-flex justify-content-between flex-wrap align-items-center pb-2 mb-3 border-bottom">
            <h3>My Orders</h3>
          </header>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <ul className="list-group list-group-flush">
                {orderItems}
              </ul>
            </div>  
          </div>      
        </main>
      </div>
    );
    
  }
}

export default MyOrders;

