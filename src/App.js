import React, { Component } from 'react';
import './App.css';

const Header = () => {
  return (
    <header className="App-header">
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
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

class AmazoffApp extends Component {
  render() {
    return (
      <div className="view-container">
        <Header />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default AmazoffApp;