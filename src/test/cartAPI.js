import _ from 'lodash';

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
    let index = _.findIndex(this.cart, 
      (cartItem) => cartItem.id === item.id
    );
    
    if (index !== -1) {
      this.cart[index].quantity++;
    } else {
      _.union(this.cart, [item]);
    } 
  }
}

export default (new CartAPI());