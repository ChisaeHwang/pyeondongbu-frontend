import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
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
  setAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("auth_status") === "authenticated";
  });

  const setAuthenticated = useCallback((value: boolean) => {
    setIsAuthenticated(value);
    if (value) {
      sessionStorage.setItem("auth_status", "authenticated");
    } else {
      sessionStorage.removeItem("auth_status");
    }
  }, []);

  const refreshUser = useCallback(async () => {
    if (!isAuthenticated) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      if (error instanceof Error && error.message === "unauthorized") {
        setUser(null);
        setAuthenticated(false);
      }
    }
  }, [isAuthenticated, setAuthenticated]);

  const login = () => {
    window.location.href = authService.getGoogleLoginUrl();
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setAuthenticated(false);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const authStatus = sessionStorage.getItem("auth_status");

      if (authStatus === "authenticated") {
        try {
          await refreshUser();
        } catch (error) {
          setAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [refreshUser, setAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
        refreshUser,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
