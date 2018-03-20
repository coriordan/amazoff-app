import React from 'react';
import { withRouter } from 'react-router-dom';
import localCache from './localCache';
import request from 'superagent' ;

const BookFormat = ({format}) => {
  
  return (
    <li className="card w-25 mr-3">
      <div className="card-body">
        <h6 className="card-title">{format.formatName}</h6>
        <p className="card-text">{format.price.currency + ' ' + 
                                    Number(format.price.amount).toFixed(2)}</p>
      </div>
    </li>
  );
}

const BookFormatList = ({formats}) => {
  let displayedFormats = formats.map(
    (f, i) => <BookFormat key={f.formatName} format={f} />
  );

  return (
    <ul className="list-unstyled d-flex flex-row flex-wrap ">
      {displayedFormats}
    </ul>
  );
}

const BookAuthor = ({author}) => {
  return ( 
    <li className="d-inline-block">{author}</li>
  );
}

const BookSpecification = ({book}) => {
  let bookAuthors = book.authors.map(
    (a, i) => <BookAuthor key={i} author={a} />  
  ); 
  
  return (
    <div className="media">
      <img className="book__image--large mr-3" src={book.imageUrl} alt={book.title}/>
      <div className="media-body">
        <h3 className="book__title mt-0 mb-3">{book.title}</h3>
        <span className="text-muted float-left">by&nbsp;</span>
        <ul className="list-unstyled book__authors">
          {bookAuthors}
        </ul>
        <hr/>  
        <BookFormatList formats={book.availableFormats} />
        <p className="book__description">{book.description}</p>
      </div>
    
    </div>
    
  );
}


class BookDetail extends React.Component {
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
    let display = <p>Book details unavailable</p>;
    let book = localCache.getBook();
    if (book) {
      display = (
        <BookSpecification book={book} />
      );
    }
    
    return (
      <div className="row">
        <main className="col-md-8" role="main">
          {display}
        </main>
        <aside className="col-md-4">
          
        </aside>
      </div>
    );
  }
};

export default withRouter(BookDetail);
