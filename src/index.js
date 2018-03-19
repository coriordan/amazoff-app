import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Home from './App';
import Header from './header';
import BookDetail from './bookDetail';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

const Router = (props) => {
  return (
    <BrowserRouter>
      <div className="view-container">
        <Header />
        <div className="container-fluid pt-4">
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/book/:id' component={ BookDetail } />
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
