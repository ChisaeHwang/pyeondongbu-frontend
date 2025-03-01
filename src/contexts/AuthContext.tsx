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
    // 이미 인증 상태 확인이 완료되었고, 인증되지 않은 상태라면 API 호출 스킵
    if (authChecked && !isAuthenticated) {
      setIsLoading(false);
      return;
    }

    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
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
  }, [handleLogout, authChecked, isAuthenticated]);

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

    // 주기적인 토큰 검증은 필요한 경우에만 활성화
    // 현재는 성능 최적화를 위해 비활성화
    /*
    const tokenCheckInterval = setInterval(async () => {
      if (isAuthenticated) {
        try {
          const isValid = await authService.validateToken();
          if (!isValid) {
            handleLogout();
          }
        } catch (error) {
          handleLogout();
        }
      }
    }, 15 * 60 * 1000); // 15분마다 체크

    return () => clearInterval(tokenCheckInterval);
    */
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
