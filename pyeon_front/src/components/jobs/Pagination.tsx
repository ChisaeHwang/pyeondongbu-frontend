import React from "react";

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
  return (
    <div className="flex justify-center gap-2 my-8">
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
          return (
            page === 1 ||
            page === totalPages ||
            Math.abs(currentPage - page) <= 2
          );
        })
        .map((page, index, array) => {
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
