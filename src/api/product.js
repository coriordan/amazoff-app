import axios from 'axios';

// get all products
export const getAll = async () => {
  const resp = await axios.get('/api/products');
  return resp.data;
}

// get product by productId
export const getProduct = async (productId) => {
  const resp = await axios.get(`/api/products/${productId}`);
  return resp.data;
}
