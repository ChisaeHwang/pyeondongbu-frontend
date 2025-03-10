import axios from "axios";
import API_CONFIG from "../api/api";
import { tokenStorage } from "./tokenStorage";

// 디버깅을 위한 로그 출력
console.log("API 기본 URL:", API_CONFIG.baseURL);
console.log(
  "현재 호스트:",
  typeof window !== "undefined" ? window.location.hostname : "SSR"
);

// Vercel 환경에서는 withCredentials를 false로 설정
const isVercelEnv =
  typeof window !== "undefined" &&
  (window.location.hostname.includes("vercel.app") ||
    window.location.hostname === "pyeondongbu.com" ||
    window.location.hostname.includes("pyeondongbu.com"));

console.log("Vercel 환경:", isVercelEnv);

const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 디버깅
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("요청 URL:", config.url);
    console.log("요청 헤더:", config.headers);
    console.log("withCredentials:", config.withCredentials);

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

// 응답 디버깅
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("응답 상태:", response.status);
    return response;
  },
  (error) => {
    console.error("API 오류:", error);

    if (error.response) {
      console.error("응답 상태:", error.response.status);
      console.error("응답 헤더:", error.response.headers);
      console.error("응답 데이터:", error.response.data);
    } else if (error.request) {
      console.error("요청은 전송되었지만 응답이 없음:", error.request);
    } else {
      console.error("오류 메시지:", error.message);
    }

    if (error.response && error.response.status === 403) {
      console.error(
        "접근이 거부되었습니다. CORS 또는 인증 문제일 수 있습니다."
      );
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
