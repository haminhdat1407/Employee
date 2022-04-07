import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response.status === 500) {
      // console.log(error.response.data.message);
      return Promise.reject(error.response.data.message);
    }
  }
);

export default axiosClient;
