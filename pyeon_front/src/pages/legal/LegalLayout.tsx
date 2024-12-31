import React from "react";
import { useNavigate } from "react-router-dom";

interface LegalLayoutProps {
  children: React.ReactNode;
}

const LegalLayout: React.FC<LegalLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 max-w-5xl mt-8">
      <div className="bg-[#25262b] rounded-lg p-8 border border-[#2c2d32]">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-gray-300 mb-6 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          뒤로가기
        </button>
        {children}
      </div>
    </div>
  );
};

export default LegalLayout;
