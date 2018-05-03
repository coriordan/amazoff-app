class LocalCache {

    constructor() {
      this.cart = null;
      this.products = [];
    }

    getCart() {
      return this.cart || {items: []};
    }

    setCart(cart) {
      this.cart = cart;
    }

    setProducts(products) {
      this.products = products;
    }

    getProducts() {
      return this.products;
    }
}

export default (new LocalCache());
