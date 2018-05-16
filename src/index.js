import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Home from './Home';
import Header from './header';
import BookDetail from './book/bookDetail';
import Checkout from './Checkout';
import Complete from './Complete';
import MyOrders from './MyOrders';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

const Router = (props) => {
  return (
    <BrowserRouter>
      <div className="view-container">
        <Header />
        <div className="container pt-4">
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/book/:id' component={BookDetail} />
              <Route path='/checkout' component={Checkout} />
              <Route path='/complete' component={Complete} />
              <Route path='/orders' component={MyOrders} />
              <Redirect from='*' to='/' />
            </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render((
    <Router/> 
), document.getElementById('root'));
