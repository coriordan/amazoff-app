import React, { Component } from 'react';
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

class Cart extends React.Component {
  render() {
    let cartItems = this.props.cart.map(
      (i) => <CartItem key={i.id} item={i} />
    );
    
    return (
      <ul>
      {cartItems}
      </ul>
    );
  }
}

class CartItem extends React.Component {
  render() {
    return (
      <li className="media cart-item my-4">
        <img className="cart-item__image mr-3" src={this.props.item.imageUrl} alt={this.props.item.title}/>
        <div className="media-body d-flex flex-row justify-content-between align-items-center">
          <div className="w-100">
            <h6 className="cart-item__title mt-0 mb-1">{this.props.item.title}</h6>
            <div className="cart-item__meta text-muted">by {this.props.item.author}</div>
          </div>
          <div className="cart-item__meta text-muted">{this.props.item.price.currency + ' ' + this.props.item.price.amount}</div>
          <select id="cart-item__quantity" className="form-control w-25">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </li>
    );
  }
}

class BookItem extends React.Component {
  render() {
    return (
      <li className="media book my-4">
        <img className="book__image mr-3" src={this.props.book.imageUrl} alt={this.props.book.title}/>
        <div className="media-body">
          <h6 className="book__title mt-0 mb-1">{this.props.book.title}</h6>
          <div className="text-muted h6">{this.props.book.author}</div>
          <div className="text-muted h6">{this.props.book.price.currency + ' ' + this.props.book.price.amount}</div>
        </div>
      </li>
    );
  }
}

class BookList extends React.Component {
  render() {
    let displayedBooks = this.props.books.map(
      (b) => <BookItem key={b.id} book={b} />
    );
    
    return (
      <ul className="list-unstyled d-flex flex-row flex-wrap justify-content-around">
        {displayedBooks}
      </ul>
    );
  }
}

class AmazoffApp extends Component {
  render() {
    return (
      <div className="view-container">
        <Header />
        <div className="container-fluid pt-4">
          <div className="row">
            <main className="col-md-8" role="main">
              <h4>Best Sellers</h4>
              <BookList books={this.props.books} />
            </main>
            <aside className="col-md-4">
              <Cart cart={this.props.cartItems} />
            </aside>
          </div>
        </div>
      </div>
    );
  }
}

export default AmazoffApp;