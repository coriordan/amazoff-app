import _ from 'lodash';

const _getByProductID = Symbol('getByProductID');
const _getByID = Symbol('getByID');

class CartAPI {

  constructor() {
    this.cart = [];
    CartAPI.nextID = 1;
  }
  
  static uniqueID() {
    return CartAPI.nextID++;  
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
    let cartItem = this[_getByProductID](item.productId);
    
    if (cartItem) {
      cartItem.quantity++;
    } else {
      item.quantity = 1;
      item.id = CartAPI.uniqueID();
      this.cart.push(item);
    } 
  }
  
  updateQuantity(id, quantity) {
    let cartItem = this[_getByID](id);    
    if (cartItem) {
      cartItem.quantity = quantity;
    }
  }
  
  completeOrder() {
    this.cart = [];
  }
  
  // private
  [_getByProductID](productId) {
    let index = _.findIndex(this.cart, 
      (cartItem) => cartItem.productId === productId
    );
    return this.cart[index];
  }
  
  [_getByID](id) {
    let index = _.findIndex(this.cart,
      (cartItem) => cartItem.id === id
    );
    return this.cart[index];
  }
}

export default (new CartAPI());