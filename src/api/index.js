import axios from 'axios';

export const apiKey = '32548d48dd18f90a75cfcbdbfa9d7519';
const api = 'https://api.themoviedb.org/3/';

export const apiCall = axios.create({
  baseURL: api,
  headers: {
    'Content-type': 'application/json',
  },
});
