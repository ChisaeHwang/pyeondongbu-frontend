import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const AuthCallback = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processAuth = async () => {
      try {
        await refreshUser();
        navigate("/", { replace: true });
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
  }, [navigate, refreshUser]);

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
