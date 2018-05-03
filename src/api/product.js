import axios from 'axios';

export const getAll = async () => {
  const resp = await axios.get('/api/products');
  return resp.data;
}