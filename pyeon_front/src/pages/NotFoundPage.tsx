import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 max-w-5xl mt-8">
      <div className="bg-[#25262b] rounded-lg p-8 text-center border border-[#2c2d32]">
        <h1 className="text-3xl font-bold text-gray-100 mb-4">404</h1>
        <p className="text-gray-400 mb-6">
          요청하신 페이지를 찾을 수 없습니다.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          메인으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
