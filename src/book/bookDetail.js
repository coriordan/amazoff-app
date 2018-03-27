import React from 'react';
import { withRouter } from 'react-router-dom';
import request from 'superagent' ;
import localCache from './localCache';
import Cart from '../cart';
import cartAPI from '../test/cartAPI';

const BuyButton = ({selectedProductIndex, addHandler, book}) => {
  const handleClick = (e) => {
    addHandler(book);
  }
  
  let disabled = (selectedProductIndex < 0);

  return (
    <div className="mb-4">    
      <button type="button" className="btn btn-outline-primary btn-lg btn-block" 
              disabled={disabled} onClick={handleClick}>Add to Cart</button>
    </div>
  );
} 

const Product = ({product, index, updateSelectedProductHandler}) => {
  const setSelectedProduct = (card) => {
    card.classList.add('border', 'border-warning', 'font-weight-bold');
    let siblings = [...card.parentElement.children].filter(c => c !== card);
    siblings.forEach(s => s.classList.remove('border', 
                                              'border-warning', 'font-weight-bold'));
  }

  const handleClick = (e) => {
    let card = e.currentTarget;
    setSelectedProduct(card);
    updateSelectedProductHandler(index);
  }

  return (
    <li className="book__format card  mr-2" onClick={handleClick}>
      <div className="card-body">
        <h6 className="card-title">{product.format}</h6>
        <p className="card-text">{product.price.currency + ' ' + 
                                    Number(product.price.amount).toFixed(2)}</p>
      </div>
    </li>
  );
}

const ProductsList = ({products, ...props}) => {
  let displayedProducts = products.map(
    (p, i) => <Product key={p.productId} {...props} product={p} index={i}/>
  );

  return (
    <ul className="list-unstyled d-flex flex-row flex-wrap ">
      {displayedProducts}
    </ul>  
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
        <hr/>
        <h6>Available formats</h6>
        <ProductsList {...props}/>
        <h3>Description</h3>
        <p className="book__description">{book.description}</p>
      </div>
    </div>
  );
}

class BookDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProductIndex : -1
    };
  }
  
  setSelectedProduct = (index) => {
    this.setState({selectedProductIndex: index});
  }
  
  addToCart = (item) => {
    let product = item.products[this.state.selectedProductIndex];
    const {title, authors, imageUrl} = item;
    let cartItem = Object.assign({}, product, {title, authors, imageUrl});    
    console.log("Added cart item: " + JSON.stringify(cartItem));
    cartAPI.add(cartItem);
    this.setState({});
  }
  
  componentDidMount() {
    request.get(
      '/books/specs/' + this.props.match.params.id + '.json',
      (err, res) => {
        let json = JSON.parse(res.text);
        localCache.setBook(json);
        this.setState({});  
      });
  }

  render() {
    let cart = cartAPI.getCartContents();
    let display = <p>Book details unavailable</p>;
    let book = localCache.getBook();
    if (book) {
      display = (
        [
          <BookSpecification book={book} 
                             products={book.products}
                             updateSelectedProductHandler={this.setSelectedProduct} />,
          <BuyButton book={book} addHandler={this.addToCart} 
                                 selectedProductIndex={this.state.selectedProductIndex} />
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
          <Cart cart={cart} {...this.props} />
        </aside>
      </div>
    );
  }
};

export default withRouter(BookDetail);
