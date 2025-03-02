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
import API_CONFIG from "../api/api";

interface AuthContextType {
  user: AuthUserResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// 로그인 상태 키
const LOGIN_STATUS_KEY = "is_logged_in";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // 초기 상태를 한 번만 계산
  const initialIsAuthenticated =
    sessionStorage.getItem(LOGIN_STATUS_KEY) === "true";

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
    sessionStorage.removeItem(LOGIN_STATUS_KEY);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      setIsLoading(true);
      // auth/me 대신 members/me 엔드포인트 사용
      const response = await fetch(`${API_CONFIG.baseURL}/api/members/me`, {
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          handleLogout();
          throw new Error("unauthorized");
        }
        throw new Error(
          `사용자 정보를 가져오는데 실패했습니다. 상태 코드: ${response.status}`
        );
      }

      const userData = await response.json();

      // 상태 업데이트
      setUser({
        id: userData.id,
        email: userData.email,
        nickname: userData.nickname,
        profileImageUrl: userData.profileImageUrl,
        authority: userData.authority,
      });
      setIsAuthenticated(true);
      sessionStorage.setItem(LOGIN_STATUS_KEY, "true");
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

  // 세션 체크 및 토큰 유효성 검증 - 최적화 버전
  useEffect(() => {
    // 이미 인증 상태 확인이 완료되었다면 다시 확인하지 않음
    if (authChecked) {
      return;
    }

    const checkSession = async () => {
      const isLoggedIn = sessionStorage.getItem(LOGIN_STATUS_KEY) === "true";

      if (isLoggedIn) {
        // 로그인 상태라면 서버에 유효성 검증 요청
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
