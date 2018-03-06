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

class AmazoffApp extends Component {
  render() {
    return (
      <div className="view-container">
        <Header />
        <div className="container-fluid pt-4">
          <div className="row">
            <main className="col-md-8" role="main">
              <h4>Best Sellers</h4>
                <ul className="list-unstyled">
                  <li className="media book my-4">
                    <img className="book__image mr-3" src="/images/1.jpg" alt="Generic placeholder image"/>
                    <div className="media-body">
                      <h5 className="mt-0 mb-1">List-based media object</h5>
                      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                    </div>
                  </li>
                  <li className="media book my-4">
                    <img className="book__image mr-3" src="/images/2.jpg" alt="Generic placeholder image"/>
                    <div className="media-body">
                      <h5 className="mt-0 mb-1">List-based media object</h5>
                      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                    </div>
                  </li>
                  <li className="media book my-4">
                    <img className="book__image mr-3" src="/images/3.jpg" alt="Generic placeholder image"/>
                    <div className="media-body">
                      <h5 className="mt-0 mb-1">List-based media object</h5>
                      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                    </div>
                  </li>
                  <li className="media book my-4">
                    <img className="book__image mr-3" src="/images/4.jpg" alt="Generic placeholder image"/>
                    <div className="media-body">
                      <h5 className="mt-0 mb-1">List-based media object</h5>
                      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                    </div>
                  </li>
                </ul>
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