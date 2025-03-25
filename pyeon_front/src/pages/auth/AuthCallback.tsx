import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { tokenStorage } from "../../utils/tokenStorage";
import ErrorModal from "../../components/common/ErrorModal";

export const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshUser } = useAuth();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorInfo, setErrorInfo] = useState({
    title: "",
    message: "",
  });

  useEffect(() => {
    const processAuth = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const error = searchParams.get("error");
        const message = searchParams.get("message");
        const token = searchParams.get("token");

        // 에러 파라미터가 있는 경우
        if (error) {
          if (error === "MEMBER_DEACTIVATED") {
            setErrorInfo({
              title: "계정 접근 제한",
              message: "비활성화된 계정입니다. 관리자에게 문의해주세요.",
            });
          } else {
            setErrorInfo({
              title: "로그인 실패",
              message: message || "로그인 중 오류가 발생했습니다.",
            });
          }
          setIsErrorModalOpen(true);
          return;
        }

        // 토큰이 있는 경우
        if (token) {
          tokenStorage.setAccessToken(token);
          await refreshUser();
          navigate("/", { replace: true });
        } else {
          // 토큰이 없는 경우
          setErrorInfo({
            title: "로그인 실패",
            message: "로그인에 실패했습니다. 다시 시도해주세요.",
          });
          setIsErrorModalOpen(true);
        }
      } catch (error) {
        setErrorInfo({
          title: "로그인 실패",
          message: "로그인 처리 중 오류가 발생했습니다.",
        });
        setIsErrorModalOpen(true);
      }
    };

    processAuth();
  }, [navigate, refreshUser, location]);

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {!isErrorModalOpen && (
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-300"></div>
          <p className="text-white">로그인 처리 중...</p>
        </div>
      )}

      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={closeErrorModal}
        title={errorInfo.title}
        message={errorInfo.message}
        actionText="로그인 페이지로 이동"
        actionLink="/login"
      />
    </div>
  );
};
