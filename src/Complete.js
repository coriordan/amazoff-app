import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './App.css';

const Complete = () => {

    return (
        <div className="row">
          <main className="col-md-12" role="main">
            <div className="jumbotron">
              <h3>Order Complete</h3>
              <p className="lead">Your order is now complete. Your items will be sent shortly and you should 
              receive delivery in a few days. Thank you for shopping with Amazoff.</p>
              <Link className="btn btn-lg btn-primary" to={'/'}>Return to homepage</Link>
            </div>  
          </main>
        </div>
    );
}

export default Complete;
