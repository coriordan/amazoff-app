import axios from 'axios';

// get a cart
export const getCart = async (cartId) => {
  const resp = await axios.get(`/api/cart/${cartId}`);
  return resp.data;
}

// create a cart
export const newCart = async () => {
  const resp = await axios.post('/api/cart');
  return resp.data;
}

// add a product to cart
export const addItem = async (cartId, productId) => {
  const resp = await axios.put(`/api/cart/${cartId}`, {product: productId});
  return resp.data;
}

// remove a product from cart
export const removeItem = async (cartId, lineItemId) => {
  const resp = await axios.delete(`/api/cart/${cartId}`, { data: {lineItem: lineItemId} });
  return resp.data;
}

// update product quantity
export const updateQuantity = async (cartId, lineItemId, quantity) => {
  const resp = await axios.put(`/api/cart/${cartId}?action=updateQuantity`, 
                              {lineItem: lineItemId, quantity: quantity});
  return resp.data;
}