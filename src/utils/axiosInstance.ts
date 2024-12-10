// utils/axiosInstance.js
import axios from "axios";

const getToken = () => {
  return localStorage.getItem("accessToken");
};

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL || "https://api.example.com",
  timeout: 10000, // Set a timeout for requests
});

// Add a request interceptor (optional)
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add authorization headers here if needed
    config.headers["Authorization"] = `Bearer ${getToken}`;
    config.headers[
      "__Host-psifi.x-csrf-token"
    ] = `Bearer ${process.env.CSRF_SECRET}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
