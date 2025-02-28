import React from "react";
import { PiPencilSimpleLine } from "react-icons/pi";

const RecruitPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">구직</h1>
          <button className="flex items-center bg-[#313338] hover:bg-[#383A40] text-[#E5E7EB] pl-4 pr-3 py-2 rounded-md transition-colors duration-200">
            <span className="font-bold">글쓰기</span>
            <PiPencilSimpleLine className="ml-1 text-lg" />
          </button>
        </div>

        {/* 구직 카테고리 */}
        <div className="flex space-x-4 border-b border-[#2c2d32] pb-4">
          <button className="text-white hover:text-blue-400 transition-colors duration-200">
            전체
          </button>
          <button className="text-gray-400 hover:text-white transition-colors duration-200">
            편집자
          </button>
          <button className="text-gray-400 hover:text-white transition-colors duration-200">
            썸네일러
          </button>
          <button className="text-gray-400 hover:text-white transition-colors duration-200">
            기타
          </button>
        </div>

        {/* 임시 컨텐츠 */}
        <div className="bg-[#25262b] rounded-lg p-6">
          <p className="text-gray-400">구직 게시판이 준비 중입니다.</p>
          <p className="text-gray-400">곧 서비스를 시작할 예정입니다.</p>
        </div>
      </div>
    </div>
  );
};

export default RecruitPage;
