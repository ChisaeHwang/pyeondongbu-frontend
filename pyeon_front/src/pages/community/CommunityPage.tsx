import React, { useState } from "react";
import { PiPencilSimpleLine, PiChatCircleTextFill } from "react-icons/pi";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../../components/jobs/Pagination";

const CommunityPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (query: string) => {
    console.log("검색어:", query);
    // TODO: 검색 로직 구현
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">커뮤니티</h1>
            <PiChatCircleTextFill className="text-2xl text-purple-400" />
          </div>
          <button className="flex items-center bg-[#313338] hover:bg-[#383A40] text-[#E5E7EB] pl-4 pr-3 py-2 rounded-md transition-colors duration-200">
            <span className="font-bold">글쓰기</span>
            <PiPencilSimpleLine className="ml-1 text-lg" />
          </button>
        </div>

        <SearchBar
          onSearch={handleSearch}
          placeholder="커뮤니티 글을 검색해보세요..."
        />

        {/* 게시글 카테고리 */}
        <div className="flex space-x-4 border-b border-[#2c2d32] pb-4">
          <button className="text-white hover:text-blue-400 transition-colors duration-200">
            전체
          </button>
          <button className="text-gray-400 hover:text-white transition-colors duration-200">
            인기
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
        <div className="space-y-3">
          <div className="bg-[#25262b] rounded-lg p-4 hover:bg-[#2c2d32] transition-colors cursor-pointer">
            <div className="flex justify-between items-start gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-medium mb-1 truncate">
                  프리미어 프로 vs 베가스 프로, 어떤 걸 배워야 할까요?
                </h3>
                <p className="text-gray-400 text-sm truncate">
                  편집 입문자입니다. 어떤 프로그램으로 시작하는 게 좋을까요...
                </p>
              </div>
              <div className="text-xs text-gray-500 whitespace-nowrap shrink-0">
                조회 342 • 댓글 28
              </div>
            </div>
          </div>
          <div className="bg-[#25262b] rounded-lg p-4 hover:bg-[#2c2d32] transition-colors cursor-pointer">
            <div className="flex justify-between items-start gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-medium mb-1 truncate">
                  초보 편집자의 취업 성공기
                </h3>
                <p className="text-gray-400 text-sm truncate">
                  6개월간의 독학 후 취업까지 성공한 과정을 공유합니다...
                </p>
              </div>
              <div className="text-xs text-gray-500 whitespace-nowrap shrink-0">
                조회 256 • 댓글 21
              </div>
            </div>
          </div>
          <div className="bg-[#25262b] rounded-lg p-4 hover:bg-[#2c2d32] transition-colors cursor-pointer">
            <div className="flex justify-between items-start gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-medium mb-1 truncate">
                  쇼츠 편집 꿀팁 공유
                </h3>
                <p className="text-gray-400 text-sm truncate">
                  제가 쇼츠 편집하면서 알게 된 유용한 팁들을 공유합니다...
                </p>
              </div>
              <div className="text-xs text-gray-500 whitespace-nowrap shrink-0">
                조회 198 • 댓글 15
              </div>
            </div>
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={1}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default CommunityPage;
