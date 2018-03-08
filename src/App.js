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
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </aside>
          </div>
        </div>
      </div>
    );
  }
}

export default AmazoffApp;