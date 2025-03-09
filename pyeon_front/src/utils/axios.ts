import axios from "axios";
import API_CONFIG from "../api/api";
import { tokenStorage } from "./tokenStorage";

const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      console.error(
        "접근이 거부되었습니다. CORS 또는 인증 문제일 수 있습니다."
      );
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
