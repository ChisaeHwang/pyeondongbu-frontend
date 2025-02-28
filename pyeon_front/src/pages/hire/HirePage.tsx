import React, { useState } from "react";
import { PiPencilSimpleLine, PiBriefcaseFill } from "react-icons/pi";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../../components/jobs/Pagination";

const HirePage: React.FC = () => {
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
            <h1 className="text-2xl font-bold text-white">구인</h1>
            <PiBriefcaseFill className="text-2xl text-blue-400" />
          </div>
          <button className="flex items-center bg-[#313338] hover:bg-[#383A40] text-[#E5E7EB] pl-4 pr-3 py-2 rounded-md transition-colors duration-200">
            <span className="font-bold">글쓰기</span>
            <PiPencilSimpleLine className="ml-1 text-lg" />
          </button>
        </div>

        <SearchBar
          onSearch={handleSearch}
          placeholder="편집자, 썸네일러를 검색해보세요..."
        />

        {/* 구인 카테고리 */}
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
        <div className="space-y-3">
          <div className="bg-[#25262b] rounded-lg p-4 hover:bg-[#2c2d32] transition-colors cursor-pointer">
            <div className="flex justify-between items-start gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-medium mb-1 truncate">
                  [구인] 1인 유튜버 편집자 편집자 구합니다
                </h3>
                <p className="text-gray-400 text-sm truncate">
                  게임 컨텐츠 전문 편집자 구합니다. 주 2회 영상 편집,
                  리그오브레전드 컨텐츠...
                </p>
              </div>
              <div className="text-xs text-gray-500 whitespace-nowrap shrink-0">
                조회 128 • 댓글 12
              </div>
            </div>
          </div>
          <div className="bg-[#25262b] rounded-lg p-4 hover:bg-[#2c2d32] transition-colors cursor-pointer">
            <div className="flex justify-between items-start gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-medium mb-1 truncate">
                  [구인] 쇼츠 전문 편집자 모집
                </h3>
                <p className="text-gray-400 text-sm truncate">
                  일일 쇼츠 3개 편집 가능하신 분, 빠른 편집 가능하신 분
                  구합니다...
                </p>
              </div>
              <div className="text-xs text-gray-500 whitespace-nowrap shrink-0">
                조회 98 • 댓글 8
              </div>
            </div>
          </div>
          <div className="bg-[#25262b] rounded-lg p-4 hover:bg-[#2c2d32] transition-colors cursor-pointer">
            <div className="flex justify-between items-start gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-medium mb-1 truncate">
                  [구인] 브이로그 편집자 구합니다
                </h3>
                <p className="text-gray-400 text-sm truncate">
                  여행 브이로그 편집 경험 있으신 분, 주 1회 영상 편집...
                </p>
              </div>
              <div className="text-xs text-gray-500 whitespace-nowrap shrink-0">
                조회 85 • 댓글 6
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

export default HirePage;
