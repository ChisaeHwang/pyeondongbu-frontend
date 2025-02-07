import { useState } from "react";
import { authService } from "../api/authService";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleAuthCallback = async (token: string) => {
    try {
      // 토큰이 유효한지 확인하는 로직 추가 가능
      setIsLoggedIn(true);
    } catch (error) {
      console.error("인증 처리 실패:", error);
      setIsLoggedIn(false);
    }
  };

  const login = () => {
    window.location.href = authService.getGoogleLoginUrl();
  };

  const logout = async () => {
    try {
      await authService.logout();
      // 쿠키 삭제
      document.cookie =
        "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      setIsLoggedIn(false);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return {
    isLoggedIn,
    login,
    logout,
    handleAuthCallback,
  };
};
