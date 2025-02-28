import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const LoginPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <div className="max-w-md mx-auto bg-[#25262b] rounded-lg p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-white text-center mb-8">
          로그인
        </h1>

        <div className="space-y-6">
          {/* 약관 안내 */}
          <div className="text-gray-400 text-sm space-y-4">
            <p>로그인 시 아래 사항에 동의하는 것으로 간주됩니다:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <Link
                  to="/terms"
                  className="text-blue-400 hover:text-blue-300"
                  target="_blank"
                >
                  이용약관
                </Link>
                에 동의
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-blue-400 hover:text-blue-300"
                  target="_blank"
                >
                  개인정보 처리방침
                </Link>
                에 동의
              </li>
            </ul>
          </div>

          {/* 구분선 */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#2c2d32]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-400 bg-[#25262b]">
                소셜 계정으로 로그인
              </span>
            </div>
          </div>

          {/* 구글 로그인 버튼 */}
          <button
            onClick={() => (window.location.href = "/api/auth/google")}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-md transition-colors duration-200"
          >
            <FcGoogle className="text-xl" />
            Google로 계속하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
