import Axios from 'axios';

export const wave = Axios.create({
  baseURL: 'https://secondfront-donate-app-nhyjb.ondigitalocean.app'
});
