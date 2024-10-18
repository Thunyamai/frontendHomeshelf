import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const login = async (houseID) => {
  const response = await axios.post(`${API_URL}/auth/login`, { houseID });
  return response.data;
};

export const addItem = async (itemData) => {
  const response = await axios.post(`${API_URL}/items`, itemData);
  return response.data;
};
