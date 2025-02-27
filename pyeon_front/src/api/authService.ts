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
    await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.auth.logout}`, {
      method: "POST",
      credentials: "include",
    });
  },

  getCurrentUser: async (): Promise<AuthUserResponse> => {
    const response = await fetch(`${API_CONFIG.baseURL}/api/auth/me`, {
      credentials: "include",
    });

    // 클라이언트가 콘솔에서 이걸 확인해도 되는지 여부 체크
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("unauthorized");
      }
      throw new Error("사용자 정보를 가져오는데 실패했습니다.");
    }

    const result: ApiResponse<AuthUserResponse> = await response.json();
    return result.data;
  },
};
