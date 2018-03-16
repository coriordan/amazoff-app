import React, { Component } from 'react';
import cartAPI from './test/cartAPI';
import _ from 'lodash';
import './App.css';

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Amazoff</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" 
        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarCollapse" className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

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

class CartItem extends React.Component {
  handleRemove = (e) => {
    e.preventDefault();
    this.props.removeHandler(this.props.item.id);
  }
  
  handleUpdateQuantity = (e) => {
    e.preventDefault();
    this.props.updateQuantityHandler(this.props.item.id, e.target.value);
  }

  render() {
    return (
      <li className="media cart-item my-4">
        <img className="cart-item__image mr-3" src={this.props.item.imageUrl} alt={this.props.item.title}/>
        <div className="media-body d-flex flex-row justify-content-between align-items-start">
          <div className="w-50">
            <h6 className="cart-item__title mt-0 mb-1">{this.props.item.title}</h6>
            <div className="cart-item__meta text-muted">by {this.props.item.author}</div>
          </div>
          <div className="cart-item__meta text-muted">{this.props.item.price.currency + ' ' + 
                                                       Number(this.props.item.price.amount).toFixed(2)}</div>
          <select id="cart-item__quantity" value={this.props.item.quantity} 
                  className="form-control form-control-sm" style={{width: '15%'}}
                  onChange={this.handleUpdateQuantity}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
            <button type="button" className="close" aria-label="Close" onClick={this.handleRemove}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </li>
    );
  }
}

class BookSortSelect extends React.Component {
  handleSortChange = (e) => {
    e.preventDefault();
    this.props.onUpdateSort(e.target.value);
  }
  
  render () {
    return (
      <form className="form-inline">
        <div className="form-group">
          <label>Sort by:&nbsp;</label>
          <select value={this.props.sort} 
              className="form-control form-control-sm custom-select custom-select-sm" 
              onChange={this.handleSortChange}>
            <option value="title">Title</option> 
            <option value="price.amount">Price</option>
            <option value="author">Author</option>
          </select>
        </div>
      </form>
    );
  }
}

class BookItem extends React.Component {
  constructor(props) {
    super(props);
  }
  
  handleAdd = (e) => {
    e.preventDefault();
    this.props.addHandler(this.props.book);
  }

  render() {
    return (
      <li className="media book my-4">
        <img className="book__image mr-3" src={this.props.book.imageUrl} alt={this.props.book.title}/>
        <div className="media-body">
          <h6 className="book__title mt-0 mb-1">{this.props.book.title}</h6>
          <div className="text-muted h6">{this.props.book.author}</div>
          <div className="text-muted h6">{this.props.book.price.currency + ' ' + 
                                          Number(this.props.book.price.amount).toFixed(2)}</div>
          <button type="button" className="btn btn-outline-primary btn-sm"
                                onClick={this.handleAdd}>Add to Cart</button>
        </div>
      </li>
    );
  }
}

class BookList extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let sortedList = _.sortBy(this.props.books, this.props.sort);
    
    let displayedBooks = sortedList.map(
      (b) => <BookItem key={b.id} book={b} 
                        addHandler={this.props.addHandler} />
    );

    return (
      <ul className="list-unstyled d-flex flex-row flex-wrap justify-content-between">
        {displayedBooks}
      </ul>
    );
  }
}

class AmazoffApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort : 'title'
    };
  }
  
  addToCart = (item) => {
    cartAPI.add(item);
    this.setState({});
  }

  removeFromCart = (id) => {
    cartAPI.remove(id);
    this.setState({});
  }

  updateQuantity = (id, quantity) => {
    cartAPI.updateQuantity(id, quantity);
    this.setState({});
  }
  
  handleUpdateSort = (value) => {
    this.setState({sort : value} );
  }
  
  render() {
    let cart = cartAPI.getCartContents();

    return (
      <div className="view-container">
        <Header />
        <div className="container-fluid pt-4">
          <div className="row">
            <main className="col-md-8" role="main">
              <div className="d-flex justify-content-between flex-wrap align-items-center pb-2 mb-3 border-bottom">
                <h3>Best Sellers</h3>
                <BookSortSelect onUpdateSort={this.handleUpdateSort} />
              </div>
              <BookList books={this.props.books} 
                        addHandler={this.addToCart} sort={this.state.sort} />
            </main>
            <aside className="col-md-4">
              <h5>Shopping Cart</h5>
              <Cart cart={cart} 
                    removeHandler={this.removeFromCart} 
                    updateQuantityHandler={this.updateQuantity} />
            </aside>
          </div>
        </div>
      </div>
    );
  }
}

export default AmazoffApp;