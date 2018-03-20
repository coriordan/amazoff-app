import React from 'react';
import { withRouter } from 'react-router-dom';
import localCache from './localCache';
import request from 'superagent' ;

const BookFormat = ({format, updateBookFormatHandler}) => {
  
  const handleClick = (e) => {
    let card = e.currentTarget;
    card.classList.add('bg-success', 'text-white');
    let siblings = [...card.parentElement.children].filter(c => c!=card);
    siblings.forEach(s => s.classList.remove('bg-success', 'text-white'));
    updateBookFormatHandler(format);
  }
  
  return (
    <li className="book__format card w-25 mr-3" onClick={handleClick}>
      <div className="card-body">
        <h6 className="card-title">{format.formatName}</h6>
        <p className="card-text">{format.price.currency + ' ' + 
                                    Number(format.price.amount).toFixed(2)}</p>
      </div>
    </li>
  );
}

const BookFormatList = ({formats, updateBookFormatHandler}) => {
  let displayedFormats = formats.map(
    (f, i) => <BookFormat key={f.formatName} format={f} 
                          updateBookFormatHandler={updateBookFormatHandler}/>
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

const BookSpecification = ({book, updateBookFormatHandler}) => {
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
        <BookFormatList formats={book.availableFormats} updateBookFormatHandler={updateBookFormatHandler}/>
        <p className="book__description">{book.description}</p>
      </div>
    
    </div>
    
  );
}


class BookDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookFormat : ''
    };
  }
  
  setFormat = (format) => {
    this.setState({bookFormat: format});
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
    let display = <p>Book details unavailable</p>;
    let book = localCache.getBook();
    if (book) {
      display = (
        <BookSpecification book={book} 
                           updateBookFormatHandler={this.setFormat}/>
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
