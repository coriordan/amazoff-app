import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <Link to={'/'} className="navbar-brand" href="/">Amazoff</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" 
        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarCollapse" className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to={'/'} className="nav-link" href="/">Products</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;