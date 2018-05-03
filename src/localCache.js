class LocalCache {

    constructor() {
      this.cart = null;
      this.products = [];
    }

    getCart() {
      return this.cart;
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
