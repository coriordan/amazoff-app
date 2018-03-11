import React from 'react';
import ReactDOM from 'react-dom';
import AmazoffApp from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import {Books, Cart} from './Data';


ReactDOM.render(<AmazoffApp books={Books} cartItems={Cart}/>, 
document.getElementById('root'));
