import _ from 'lodash';

const _getByID = Symbol('getByID');

class CartAPI {

  constructor() {
    this.cart = [];
  }

  getCartContents() {
    return this.cart;
  }

  remove(id) {
    let item = _.remove(this.cart, 
      (cartItem) => cartItem.id === id
    );
    return item;
  }

  add(item) {
    // if item already exists, increase item quantity in cart,
    // otherwise, add item
    let cartItem = this[_getByID](item.format.id);
    
    if (cartItem) {
      cartItem.quantity++;
    } else {
      item.quantity = 1;
      this.cart.push(item);
    } 
  }
  
  updateQuantity(id, quantity) {
    let cartItem = this[_getByID](id);
    
    if (cartItem) {
      cartItem.quantity = quantity;
    }
  }
  
  // private
  [_getByID](id) {
    let index = _.findIndex(this.cart, 
      (cartItem) => cartItem.format.id === id
    );
    
    return this.cart[index];
  }
}

export default (new CartAPI());