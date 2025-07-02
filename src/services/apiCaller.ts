import axios from "axios";
const API_URL = "https://tr-cafe.onrender.com/api";
// const API_URL = "https://tour-back-office.onrender.com/api";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const publicGet = async (endpoint: string) => {
  const response = await axios.get(`${API_URL}${endpoint}`, config);
  return response.data;
};

export const publicPost = async (endpoint: string, data: any) => {
  const response = await axios.post(`${API_URL}${endpoint}`, data, config);
  return response.data;
};

// Private requests (require token)
export const privateGet = async (endpoint: string, token: string) => {
  const authConfig = {
    ...config,
    headers: { ...config.headers, Authorization: `Bearer ${token}` }
  };
  const response = await axios.get(`${API_URL}${endpoint}`, authConfig);
  return response.data;
};

export const privatePost = async (endpoint: string, token: string, data: any) => {
  const authConfig = {
    ...config,
    headers: { ...config.headers, Authorization: `Bearer ${token}` }
  };
  const response = await axios.post(`${API_URL}${endpoint}`, data, authConfig);
  return response.data;
};

export const privatePut = async (endpoint: string, token: string, data: any) => {
  const authConfig = {
    ...config,
    headers: { ...config.headers, Authorization: `Bearer ${token}` }
  };
  const response = await axios.put(`${API_URL}${endpoint}`, data, authConfig);
  return response.data;
};