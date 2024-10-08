import axios from "axios";

// const API_ENDPOINT = "https://ugo-out-api.appworkdemo.com/api/";
// export const imageURL = "https://ugo-out-api.appworkdemo.com/public/images/";

// const API_ENDPOINT = "http://35.177.56.74:3028/api/";
// export const imageURL = "http://35.177.56.74:3028/public/images/";


const API_ENDPOINT = "http://127.0.0.1:3028/api/";
export const imageURL = "http://127.0.0.1:3028/public/images/";
    

const DataService = axios.create({
  baseURL: API_ENDPOINT,
});

DataService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { DataService, API_ENDPOINT };
