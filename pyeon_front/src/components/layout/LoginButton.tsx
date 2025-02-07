import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../contexts/AuthContext";

const LoginButton: React.FC = () => {
  const { login } = useAuth();

  return (
    <button
      onClick={login}
      className="bg-white text-gray-800 px-3 py-1.5 rounded-md 
      hover:bg-gray-100 transition-colors flex items-center gap-2 
      border border-transparent hover:border-gray-300 font-pretendard font-semibold text-sm"
    >
      <span>구글 로그인</span>
      <FcGoogle size={18} className="inline-block" />
    </button>
  );
};

export default LoginButton;
