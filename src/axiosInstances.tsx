import Axios from 'axios';

export const wave = Axios.create({
  baseURL: 'https://stingray-app-t4hhl.ondigitalocean.app'
});
