import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Corrected syntax
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;
