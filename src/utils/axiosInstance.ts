import axios from "axios";
import "dotenv/config";

const protectedApiInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    "Content-Type": "application/json",
    "__Host-psifi.x-csrf-token": process.env.CSRF_SECRET,
  },
  timeout: 10000,
});

protectedApiInstance.interceptors.request.use(
  (config) => config,
  (error) => error.response.data
);

protectedApiInstance.interceptors.response.use(
  (config) => config,
  (error) => error.response.data
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
  (error) => error.response.data
);

publicApiInstance.interceptors.response.use(
  (config) => config,
  (error) => error.response.data
);

export { publicApiInstance, protectedApiInstance };
