import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { tokenStorage } from "../../utils/tokenStorage";
import ErrorModal from "../../components/common/ErrorModal";
import axios from "axios";

export const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorInfo, setErrorInfo] = useState({
    title: "",
    message: "",
  });

  useEffect(() => {
    const processAuth = async () => {
      try {
        // URL에서 token 파라미터 추출
        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get("token");

        if (token) {
          // URL 파라미터로 토큰이 전달된 경우 (OAuth2AuthenticationSuccessHandler에서 전달)
          tokenStorage.setAccessToken(token);
          await refreshUser();
          navigate("/", { replace: true });
        } else {
          // 토큰이 없는 경우
          throw new Error("토큰이 없습니다.");
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          // 403 에러가 발생한 경우 (비활성화된 계정)
          if (error.response.status === 403) {
            const errorMessage =
              error.response.data.message || "계정 접근이 제한되었습니다.";

            setErrorInfo({
              title: "계정 접근 제한",
              message: errorMessage,
            });

            setIsErrorModalOpen(true);

            // 로컬 스토리지에서 관련 데이터 삭제
            tokenStorage.clearTokens();
            return;
          }
        }

        // 기타 에러
        setError("로그인 처리 중 오류가 발생했습니다.");
        // 3초 후 홈으로 리다이렉트
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 3000);
      }
    };

    processAuth();
  }, [navigate, refreshUser, location]);

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p className="text-white">로그인 처리 중...</p>
      )}

      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={closeErrorModal}
        title={errorInfo.title}
        message={errorInfo.message}
        actionText="홈으로 돌아가기"
        actionLink="/"
      />
    </div>
  );
};
