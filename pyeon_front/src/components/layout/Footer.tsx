import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#25262b] border-t border-[#2c2d32] py-8 mt-auto">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src="https://ifh.cc/g/PDRy1k.png"
              alt="편동부 로고"
              className="h-6 w-6 object-contain"
            />
            <span className="text-gray-400 font-medium">편동부</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
            <Link to="/terms" className="hover:text-gray-300 transition-colors">
              이용약관
            </Link>
            <Link
              to="/privacy"
              className="hover:text-gray-300 transition-colors"
            >
              개인정보처리방침
            </Link>
            <Link
              to="/contact"
              className="hover:text-gray-300 transition-colors"
            >
              문의하기
            </Link>
          </div>

          <div className="text-sm text-gray-500">
            © 2024 편동부. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
