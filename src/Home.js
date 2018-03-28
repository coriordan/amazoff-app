import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import cartAPI from './test/cartAPI';
import Cart from './cart';
import {Books} from './Data';
import './App.css';
import _ from 'lodash';

const BookSortSelect = ({sort, onUpdateSort}) => {
  const handleSortChange = (e) => {
    e.preventDefault();
    onUpdateSort(e.target.value);
  }
  
  return (
    <form className="form-inline">
      <div className="form-group">
        <label>Sort by:&nbsp;</label>
        <select value={sort} 
            className="form-control form-control-sm custom-select custom-select-sm" 
            onChange={handleSortChange}>
          <option value="title">Title</option> 
          <option value="price.amount">Price</option>
          <option value="author">Author</option>
        </select>
      </div>
    </form>
  );
}

const BookItem = ({book, addHandler}) => {
  const handleAdd = (e) => {
    e.preventDefault();
    addHandler(book, book.defaultProduct);
  };

  return (
      <li className="media book my-4">
        <Link to={'/book/' + book.bookId}>
          <img className="book__image mr-3" src={book.imageUrl} alt={book.title}/>   
        </Link>
        <div className="media-body">
          <Link to={'/book/' + book.bookId}>
            <h6 className="book__title mt-0 mb-1">{book.title}</h6>
          </Link>
          <div className="text-muted h6">{book.authors[0]}</div>
          <div className="text-muted h6">{book.defaultProduct.price.currency + ' ' + 
                                          Number(book.defaultProduct.price.amount).toFixed(2)}</div>
          <button type="button" className="btn btn-outline-primary btn-sm"
                                onClick={handleAdd}>Add to Cart</button>
        </div>
      </li>
  );
}

const BookList = ({books, sort, ...props}) => {
  let sortedList = _.sortBy(books, sort);
    
  let displayedBooks = sortedList.map(
    (b) => <BookItem key={b.bookId} book={b} {...props} />
  );

  return (
    <ul className="list-unstyled d-flex flex-row flex-wrap justify-content-between">
      {displayedBooks}
    </ul>
  );
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort : 'title'
    };
  }
  
  addToCart = (item, product) => {
    const {title, authors, imageUrl} = item;
    let cartItem = Object.assign({}, product, {title, authors, imageUrl});    
    cartAPI.add(cartItem);
    this.setState({});
  }
  
  handleUpdateSort = (value) => {
    this.setState({sort : value} );
  }
   
  render() {
    let cart = cartAPI.getCartContents();

    return (
        <div className="row">
          <main className="col-md-7" role="main">
            <header className="d-flex justify-content-between flex-wrap align-items-center pb-2 mb-3 border-bottom">
              <h3>Best Sellers</h3>
              <BookSortSelect sort={this.state.sort} onUpdateSort={this.handleUpdateSort} />
            </header>
            <BookList books={Books} 
                      addHandler={this.addToCart} sort={this.state.sort} />
          </main>
          <aside className="col-md-5">
            <h5>Shopping Cart</h5>
            <Cart cart={cart} 
                  {...this.props} />
          </aside>
        </div>
    );
  }
}

export default Home;