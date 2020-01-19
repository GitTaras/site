import axios from 'axios';
import _ from 'lodash';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  const newConfig = _.cloneDeep(config);
  if (token) {
    newConfig.headers.authorization = `Bearer ${token}`;
  } else {
    delete newConfig.headers.authorization;
  }
  return newConfig;
}, error => Promise.reject(error));

axios.interceptors.response.use(response => response, (error) => {
  if (error.response.status === 401) {
    window.location.replace('/signin');
  }
  if (error.response.status === 403) {
    window.location.replace('/not_found');
  }
  return Promise.reject(error);
});
