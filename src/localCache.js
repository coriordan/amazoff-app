class LocalCache {

  constructor() {
    this.cart = null;
    this.products = [];
    this.product = null;
    this.orders = null;
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
  
  setProduct(product) {
    this.product = product;
  }
  
  getProduct() {
    return this.product;
  }
  
  setOrders(orders) {
    this.orders = orders;
  }
  
  getOrders() {
    return this.orders || [];
  }
}

export default (new LocalCache());
