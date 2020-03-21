import Axios from 'axios';

export const ROOT_URL = 'http://c19md.xyz:8000';

const axiosInstance = Axios.create({
  baseURL: ROOT_URL
});

export default axiosInstance;
