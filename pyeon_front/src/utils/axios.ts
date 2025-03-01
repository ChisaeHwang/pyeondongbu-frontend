import axios from "axios";
import API_CONFIG from "../api/api";

const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
