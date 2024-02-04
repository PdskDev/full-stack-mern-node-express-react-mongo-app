import axios from 'axios';

const API_URL = '/api/users';
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('taskUser', JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData);

  if (response.data) {
    localStorage.setItem('taskUser', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => localStorage.removeItem('taskUser');

const authService = { register, login, logout };
export default authService;
