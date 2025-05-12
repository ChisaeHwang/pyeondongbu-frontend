import React, { useState, useEffect } from "react";

// 윈도우 크기를 추적하는 훅
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  return (
    <div className="flex flex-wrap justify-center gap-2 my-8 max-w-full overflow-hidden">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          currentPage === 1
            ? "bg-[#2c2d32] text-gray-500 cursor-not-allowed"
            : "bg-[#25262b] text-gray-300 hover:bg-[#2c2d32] border border-[#2c2d32]"
        }`}
      >
        이전
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter((page) => {
          // 모바일에서는 표시할 페이지 수를 줄임
          return (
            page === 1 || Math.abs(currentPage - page) <= (isMobile ? 1 : 2)
          );
        })
        .map((page, index, array) => {
          // 왼쪽에만 생략 부호를 표시하고, 오른쪽에는 표시하지 않음
          if (index > 0 && page - array[index - 1] > 1) {
            return (
              <span
                key={`ellipsis-${page}`}
                className="px-4 py-2 text-gray-500"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-[#25262b] text-gray-300 hover:bg-[#2c2d32] border border-[#2c2d32]"
              }`}
            >
              {page}
            </button>
          );
        })}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          currentPage === totalPages
            ? "bg-[#2c2d32] text-gray-500 cursor-not-allowed"
            : "bg-[#25262b] text-gray-300 hover:bg-[#2c2d32] border border-[#2c2d32]"
        }`}
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
