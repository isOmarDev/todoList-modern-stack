import axios, { AxiosInstance } from 'axios';

const HEADERS = {
  'Content-type': 'application/json',
  Accept: 'application/json',
};

// axios instance creator
const createAxios = (): AxiosInstance => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: HEADERS,
  });
};

// axios instances
export const http = createAxios();
