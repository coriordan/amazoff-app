import axios from 'axois';

// login user
export const login = async (username, password) => {
  const resp = await axois.post('/api/auth', {username: username, password: password});
  return resp.data;
}

// logout user
export const logout = async () => {
  const resp = await axios.delete('/api/auth');
  return resp.data;
}