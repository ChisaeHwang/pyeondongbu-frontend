import React from "react";

const CommunityPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">커뮤니티</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
            글쓰기
          </button>
        </div>

        {/* 게시글 카테고리 */}
        <div className="flex space-x-4 border-b border-[#2c2d32] pb-4">
          <button className="text-white hover:text-blue-400 transition-colors duration-200">
            전체
          </button>
          <button className="text-gray-400 hover:text-white transition-colors duration-200">
            자유
          </button>
          <button className="text-gray-400 hover:text-white transition-colors duration-200">
            질문
          </button>
          <button className="text-gray-400 hover:text-white transition-colors duration-200">
            정보
          </button>
        </div>

        {/* 임시 컨텐츠 */}
        <div className="bg-[#25262b] rounded-lg p-6">
          <p className="text-gray-400">커뮤니티 게시판이 준비 중입니다.</p>
          <p className="text-gray-400">곧 서비스를 시작할 예정입니다.</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
