import axios from 'axios';
import eventEmitter from 'eventEmiter';

const axiosInstance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      eventEmitter.emit('logout');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
