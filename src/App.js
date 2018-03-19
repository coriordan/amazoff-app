import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import cartAPI from './test/cartAPI';
import Cart from './cart';
import {Books} from './Data';
import _ from 'lodash';
import './App.css';


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
  handleAdd = (e) => {
    e.preventDefault();
    this.props.addHandler(this.props.book);
  }

  render() {
    return (
      <li className="media book my-4">
        <Link to={'/book/' + this.props.book.id}>
          <img className="book__image mr-3" src={this.props.book.imageUrl} alt={this.props.book.title}/>   
        </Link>
        <div className="media-body">
          <Link to={'/book/' + this.props.book.id}>
            <h6 className="book__title mt-0 mb-1">{this.props.book.title}</h6>
          </Link>
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

class Home extends Component {
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
        <div className="row">
          <main className="col-md-8" role="main">
            <div className="d-flex justify-content-between flex-wrap align-items-center pb-2 mb-3 border-bottom">
              <h3>Best Sellers</h3>
              <BookSortSelect onUpdateSort={this.handleUpdateSort} />
            </div>
            <BookList books={Books} 
                      addHandler={this.addToCart} sort={this.state.sort} />
          </main>
          <aside className="col-md-4">
            <h5>Shopping Cart</h5>
            <Cart cart={cart} 
                  removeHandler={this.removeFromCart} 
                  updateQuantityHandler={this.updateQuantity} />
          </aside>
        </div>
    );
  }
}

export default Home;