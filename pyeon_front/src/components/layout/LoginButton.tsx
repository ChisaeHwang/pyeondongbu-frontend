import React from "react";
import { useNavigate } from "react-router-dom";
import { PiUser } from "react-icons/pi";

const LoginButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/login")}
      className="group flex items-center text-gray-400 hover:text-white py-1.5 mt-0.5 transition-colors duration-200"
    >
      <PiUser className="text-xl" />
      <span className="font-medium ml-2 relative mt-0.5">
        로그인
        <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-200" />
      </span>
    </button>
  );
};

export default LoginButton;
