import API_CONFIG from "./api";
import { AuthUserResponse } from "../types/auth";
import { tokenStorage } from "../utils/tokenStorage";
import axiosInstance from "../utils/axios";

export const authService = {
  getGoogleLoginUrl: () => {
    return `${API_CONFIG.baseURL}${API_CONFIG.endpoints.auth.googleLogin}`;
  },

  logout: async (): Promise<void> => {
    try {
      // 토큰을 헤더에 포함하여 로그아웃 요청
      await axiosInstance.post(API_CONFIG.endpoints.auth.logout);

      // 로컬 토큰 삭제
      tokenStorage.clearTokens();
    } catch (error) {
      console.error("로그아웃 요청 중 오류 발생:", error);
      // 오류가 발생해도 로컬 토큰은 삭제
      tokenStorage.clearTokens();
      throw error;
    }
  },

  getCurrentUser: async (): Promise<AuthUserResponse> => {
    try {
      // 토큰을 헤더에 포함하여 사용자 정보 요청
      const response = await axiosInstance.get("/api/auth/me");
      return response.data.data;
    } catch (error) {
      console.error("사용자 정보 조회 실패:", error);
      throw error;
    }
  },

  // 토큰 유효성 검사
  validateToken: async (): Promise<boolean> => {
    try {
      // 토큰이 없으면 false 반환
      if (!tokenStorage.hasToken()) {
        return false;
      }

      // 토큰을 헤더에 포함하여 유효성 검사 요청
      const response = await axiosInstance.head("/api/auth/me");
      return response.status === 200;
    } catch (error) {
      return false;
    }
  },
};
