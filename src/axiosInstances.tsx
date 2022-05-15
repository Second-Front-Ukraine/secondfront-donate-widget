import Axios from 'axios';

export const wave = Axios.create({
  baseURL: 'http://localhost:5001'
});
