import React from "react";
import { useNavigate } from "react-router-dom";
import LegalLayout from "./LegalLayout";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <LegalLayout>
      <div className="text-center py-8">
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
    </LegalLayout>
  );
};

export default NotFoundPage;
