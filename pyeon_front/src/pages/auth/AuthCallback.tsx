import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { authService } from "../../api/authService";
import { tokenStorage } from "../../utils/tokenStorage";

export const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshUser } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processAuth = async () => {
      try {
        // URL에서 code 파라미터 추출
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get("code");

        // 토큰 파라미터 확인 (백엔드에서 URL 파라미터로 토큰을 전달하는 경우)
        const token = urlParams.get("token");

        if (token) {
          // URL 파라미터로 토큰이 전달된 경우
          tokenStorage.setAccessToken(token);
          await refreshUser();
          navigate("/", { replace: true });
        } else if (code) {
          // 인증 코드가 있는 경우 백엔드에 토큰 요청
          await authService.handleGoogleCallback(code);
          // 토큰이 응답 본문에 있으면 저장됨 (handleGoogleCallback 내부에서 처리)
          await refreshUser();
          navigate("/", { replace: true });
        } else {
          // 코드나 토큰이 없는 경우
          throw new Error("인증 코드 또는 토큰이 없습니다.");
        }
      } catch (error) {
        console.error("로그인 처리 중 오류 발생:", error);
        setError("로그인 처리 중 오류가 발생했습니다.");
        // 3초 후 홈으로 리다이렉트
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 3000);
      }
    };

    processAuth();
  }, [navigate, refreshUser, location]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p className="text-white">로그인 처리 중...</p>
      )}
    </div>
  );
};
