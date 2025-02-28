import React from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const LoginButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/login")}
      className="flex items-center h-9 gap-1 bg-white hover:bg-gray-100 text-gray-800 pl-3 pr-4 rounded-md transition-colors duration-200"
    >
      <FcGoogle className="text-lg" />
      <span className="font-medium text-sm">로그인</span>
    </button>
  );
};

export default LoginButton;
