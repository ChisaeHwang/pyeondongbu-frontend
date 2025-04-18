import React from "react";
import { Link } from "react-router-dom";
import Logo from "../common/Logo";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#25262b] border-t border-[#2c2d32]">
      <div className="container mx-auto px-4 py-8">
        {/* 메인 푸터 */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* 왼쪽: 로고 및 서비스 정보 */}
          <div className="flex-1">
            <div className="mb-4">
              <Logo className="h-6 w-auto" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              편집자와 크리에이터를 연결하는 구인구직 정보를 제공합니다.
              <br />
              모든 정보는 공개된 플랫폼에서 수집된 공개 데이터만을 활용합니다.
            </p>
          </div>

          {/* 오른쪽: 링크들 */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <Link
                to="/terms"
                className="text-gray-400 hover:text-gray-300 text-sm"
              >
                이용약관
              </Link>
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-gray-300 text-sm"
              >
                개인정보처리방침
              </Link>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-gray-300 text-sm"
              >
                문의하기
              </Link>
            </div>
          </div>
        </div>

        {/* 저작권 및 면책 */}
        <div className="mt-8 pt-4 border-t border-[#2c2d32]">
          <p className="text-gray-500 text-xs leading-relaxed">
            편동부에 표시된 모든 브랜드, 상표는 해당 소유자의 자산이며, 편동부는
            정보 제공의 목적으로만 사용합니다. 수집되는 모든 정보는 누구나
            자유롭게 접근 가능한 공개 데이터에 한합니다.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            © 2025 편동부. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
