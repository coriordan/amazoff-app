import React from 'react';
import request from 'superagent' ;
import localCache from '../localCache';
import * as productAPI from '../api/product';
import * as cartAPI from '../api/cart';
import Cart from '../cart';

const BuyButton = ({addHandler, book}) => {
  const handleClick = (e) => {
    addHandler(book);
  }

  return (
    <div className="mb-4">    
      <button type="button" className="btn btn-outline-primary btn-lg btn-block" 
             onClick={handleClick}>Add to Cart</button>
    </div>
  );
} 

const BookAuthor = ({author}) => {
  return ( 
    <li className="d-inline-block">{author}</li>
  );
}

const BookSpecification = ({book, ...props}) => {
  let bookAuthors = book.authors.map(
    (a, i) => <BookAuthor key={i} author={a} />  
  ); 

  return (
    <div className="media">
      <img className="book__image--large mr-4" src={book.imageUrl} alt={book.title}/>
      <div className="media-body">
        <h3 className="book__title mt-0 mb-3">{book.title}</h3>
        <span className="text-muted float-left">by&nbsp;</span>
        <ul className="list-unstyled book__authors">
          {bookAuthors}
        </ul>
        <p className="text-muted h6 mb-4">{book.price.currency + ' ' + 
                                          Number(book.price.amount).toFixed(2)}</p>
        <h3>Description</h3>
        <p className="book__description">{book.description}</p>
      </div>
    </div>
  );
}

class BookDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  addToCart = async (item) => {
    let cart = localCache.getCart();
    await cartAPI.addItem(cart._id, item._id);
    cart = await cartAPI.getCart(cart._id); // reload cart
    localCache.setCart(cart);
    this.setState({});
  }
  
  async componentDidMount() {
    let productId = this.props.match.params.id;
    let product = await productAPI.getProduct(productId);
    localCache.setProduct(product);
    this.setState({});
  }

  render() {
    let display = <p>Book details unavailable</p>;
    let book = localCache.getProduct();
    if (book) {
      display = (
        [
          <BookSpecification book={book} />,
          <BuyButton book={book} addHandler={this.addToCart} />
        ]
      );
    }

    return (
      <div className="row">
        <main className="col-md-7" role="main">
          {display}
        </main>
        <aside className="col-md-5">
          <h5>Shopping Cart</h5>
          <Cart {...this.props} />
        </aside>
      </div>
    );
  }
};

export default BookDetail;
