import axios from "axios";
import API_CONFIG from "../api/api";
import { tokenStorage } from "./tokenStorage";

const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터
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

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 403 에러일 경우 로그아웃 처리
    if (error.response && error.response.status === 403) {
      // 비활성화된 계정 관련 메시지인 경우
      const errorMessage = error.response.data?.message || "";
      if (
        errorMessage.includes("사용이 제한된 사용자") ||
        errorMessage.includes("탈퇴한 사용자")
      ) {
        tokenStorage.clearTokens();
        // 로그인 페이지가 아닌 경우에만 리다이렉트
        if (!window.location.pathname.includes("/auth")) {
          window.location.href = "/";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
