import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const AuthCallback = () => {
  const navigate = useNavigate();
  const { handleAuthCallback } = useAuth();

  useEffect(() => {
    const processAuth = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
          // 토큰을 쿠키에 저장하는 로직
          document.cookie = `accessToken=${token}; path=/; HttpOnly; Secure; SameSite=Strict`;

          // 로그인 상태 업데이트
          await handleAuthCallback(token);

          // 메인 페이지로 리다이렉트
          navigate("/");
        } else {
          console.error("토큰을 찾을 수 없습니다.");
          navigate("/");
        }
      } catch (error) {
        console.error("인증 처리 중 오류 발생:", error);
        navigate("/");
      }
    };

    processAuth();
  }, [navigate, handleAuthCallback]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-white">로그인 처리 중...</p>
    </div>
  );
};
