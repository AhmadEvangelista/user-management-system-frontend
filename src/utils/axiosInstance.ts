import axios from "axios";
import "dotenv/config";

const getToken = () => {
  return localStorage.getItem("accessToken");
};

const protectedApiInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    Authorization: `Bearer ${getToken}`,
    "Content-Type": "application/json",
    "__Host-psifi.x-csrf-token": process.env.CSRF_SECRET,
  },
  timeout: 10000,
});

protectedApiInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

protectedApiInstance.interceptors.response.use(
  (config) => config,
  (error) => Promise.reject(error)
);

const publicApiInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "__Host-psifi.x-csrf-token": process.env.CSRF_SECRET,
  },
  timeout: 10000,
});

publicApiInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

publicApiInstance.interceptors.response.use(
  (config) => config,
  (error) => Promise.reject(error)
);

export { publicApiInstance, protectedApiInstance };
