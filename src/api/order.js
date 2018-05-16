import axios from 'axios';

// create an order
export const newOrder = async (cartId) => {
  const resp = await axios.post('/api/order', {cart: cartId});
  return resp.data;
}

// get an order
export const getOrder = async (orderId) => {
  const resp = await axios.get(`/api/order/${orderId}`);
  return resp.data;
}

// get all orders
export const getAll = async () => {
  const resp = await axios.get('/api/order');
  return resp.data;
}

