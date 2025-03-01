import API_CONFIG from "./api";
import { TokenResponse, AuthUserResponse, ApiResponse } from "../types/auth";

export const authService = {
  getGoogleLoginUrl: () => {
    return `${API_CONFIG.baseURL}${API_CONFIG.endpoints.auth.googleLogin}`;
  },

  handleGoogleCallback: async (code: string): Promise<TokenResponse> => {
    const response = await fetch(
      `${API_CONFIG.baseURL}${API_CONFIG.endpoints.auth.googleCallback}?code=${code}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("구글 로그인에 실패했습니다.");
    }

    const data: TokenResponse = await response.json();
    return data;
  },

  logout: async (): Promise<void> => {
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}${API_CONFIG.endpoints.auth.logout}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.error("로그아웃 API 호출 실패:", response.status);
      }
    } catch (error) {
      console.error("로그아웃 요청 중 오류 발생:", error);
      throw error;
    }
  },

  getCurrentUser: async (): Promise<AuthUserResponse> => {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/api/auth/me`, {
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("unauthorized");
        }
        throw new Error(
          `사용자 정보를 가져오는데 실패했습니다. 상태 코드: ${response.status}`
        );
      }

      const result: ApiResponse<AuthUserResponse> = await response.json();
      return result.data;
    } catch (error) {
      console.error("사용자 정보 조회 실패:", error);
      throw error;
    }
  },

  // 토큰 유효성 검사 - 간소화된 버전
  validateToken: async (): Promise<boolean> => {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/api/auth/me`, {
        method: "HEAD", // 헤더만 요청하여 부하 감소
        credentials: "include",
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  },
};
