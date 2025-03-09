import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { authService } from "../api/authService";
import { AuthUserResponse } from "../types/auth";
import { tokenStorage } from "../utils/tokenStorage";
import axiosInstance from "../utils/axios";

interface AuthContextType {
  user: AuthUserResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // 초기 인증 상태는 토큰 존재 여부로 판단
  const initialIsAuthenticated = tokenStorage.hasToken();

  const [user, setUser] = useState<AuthUserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(initialIsAuthenticated); // 로그인된 상태일 때만 로딩 상태 활성화
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialIsAuthenticated
  );

  // 인증 상태 변경 추적을 위한 참조
  const [authChecked, setAuthChecked] = useState(false);

  // 로그아웃 처리 함수
  const handleLogout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    tokenStorage.clearTokens();
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      setIsLoading(true);

      // 토큰이 없으면 로그아웃 처리
      if (!tokenStorage.hasToken()) {
        handleLogout();
        throw new Error("토큰이 없습니다.");
      }

      // 토큰을 헤더에 포함하여 사용자 정보 요청
      const response = await axiosInstance.get("/api/members/me");
      const userData = response.data;

      // 상태 업데이트
      setUser({
        id: userData.id,
        email: userData.email,
        nickname: userData.nickname,
        profileImageUrl: userData.profileImageUrl,
        authority: userData.authority,
      });
      setIsAuthenticated(true);
    } catch (error) {
      // 401 에러 등 인증 실패 시 로그아웃 처리
      handleLogout();
      console.error("인증 정보 갱신 실패:", error);
    } finally {
      setIsLoading(false);
      setAuthChecked(true);
    }
  }, [handleLogout]);

  const login = useCallback(() => {
    window.location.href = authService.getGoogleLoginUrl();
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      handleLogout();
    } catch (error) {
      console.error("로그아웃 실패:", error);
      // 로그아웃 API 호출 실패해도 클라이언트에서는 로그아웃 처리
      handleLogout();
    }
  }, [handleLogout]);

  // 세션 체크 및 토큰 유효성 검증
  useEffect(() => {
    // 이미 인증 상태 확인이 완료되었다면 다시 확인하지 않음
    if (authChecked) {
      return;
    }

    const checkSession = async () => {
      // 토큰이 있는지 확인
      const hasToken = tokenStorage.hasToken();

      if (hasToken) {
        // 토큰이 있으면 서버에 유효성 검증 요청
        try {
          await refreshUser();
        } catch (error) {
          handleLogout();
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setAuthChecked(true);
      }
    };

    checkSession();
  }, [refreshUser, handleLogout, authChecked]);

  // context 값을 메모이제이션하여 불필요한 리렌더링 방지
  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      login,
      logout,
      refreshUser,
    }),
    [user, isLoading, isAuthenticated, login, logout, refreshUser]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
