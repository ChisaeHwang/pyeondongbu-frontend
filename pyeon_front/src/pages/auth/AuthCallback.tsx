import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const AuthCallback = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const processAuth = async () => {
      try {
        await refreshUser();
        navigate("/", { replace: true });
      } catch (error) {
        navigate("/");
      }
    };

    processAuth();
  }, [navigate, refreshUser]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-white">로그인 처리 중...</p>
    </div>
  );
};
