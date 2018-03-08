import React from 'react';
import ReactDOM from 'react-dom';
import AmazoffApp from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Books from './Data';


ReactDOM.render(<AmazoffApp books={Books}/>, 
document.getElementById('root'));
