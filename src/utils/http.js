import axios from 'axios';

const service = axios.create({
  baseURL: `${location.protocol}//${location.hostname}${
    self.location.port ? ':' + self.location.port : ''
  }/api`,
  timeout: 1000,
});

service.interceptors.response.use(
  response => {
    const result = response.data;
    if (result.code === 'S_OK') {
      return result.data;
    } else {
      throw result;
    }
  },
  error => {
    console.warn(error);
  }
);

export default service;
