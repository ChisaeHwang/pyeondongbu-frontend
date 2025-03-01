import React, { useState, useEffect } from "react";
import { PiPencilSimpleLine, PiUserFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../../components/jobs/Pagination";
import axiosInstance from "../../utils/axios";
import { getRelativeTime } from "../../utils/dateUtils";

interface Post {
  id: number;
  title: string;
  content: string;
  memberNickname: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  category: {
    mainCategory: string;
    subCategory: string;
  };
}

const RecruitPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("전체");

  // 게시글 데이터 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/api/recruit/posts", {
          params: {
            page: currentPage - 1,
            size: 10,
            subCategory: activeCategory !== "전체" ? activeCategory : null,
          },
        });

        setPosts(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("게시글을 불러오는 중 오류가 발생했습니다:", error);
        setError("게시글을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, activeCategory]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/recruit/posts/search", {
        params: {
          keyword: query,
          page: 0,
          size: 10,
        },
      });

      setPosts(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(1);
    } catch (error) {
      console.error("검색 중 오류가 발생했습니다:", error);
      setError("검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 게시글 클릭 시 상세 페이지로 이동
  const handlePostClick = (postId: number) => {
    navigate(`/recruit/posts/${postId}`);
  };

  // 카테고리 변경
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">구직</h1>
            <PiUserFill className="text-2xl text-fuchsia-400" />
          </div>
          <Link to="/create?category=구직">
            <button className="flex items-center bg-[#313338] hover:bg-[#383A40] text-[#E5E7EB] pl-4 pr-3 py-2 rounded-md transition-colors duration-200">
              <span className="font-bold">글쓰기</span>
              <PiPencilSimpleLine className="ml-1 text-lg" />
            </button>
          </Link>
        </div>

        <SearchBar
          onSearch={handleSearch}
          placeholder="원하는 포지션을 검색해보세요..."
        />

        {/* 구직 카테고리 */}
        <div className="flex space-x-4 border-b border-[#2c2d32] pb-4">
          <button
            className={`transition-colors duration-200 ${
              activeCategory === "전체"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => handleCategoryChange("전체")}
          >
            전체
          </button>
          <button
            className={`transition-colors duration-200 ${
              activeCategory === "편집자"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => handleCategoryChange("편집자")}
          >
            편집자
          </button>
          <button
            className={`transition-colors duration-200 ${
              activeCategory === "썸네일러"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => handleCategoryChange("썸네일러")}
          >
            썸네일러
          </button>
          <button
            className={`transition-colors duration-200 ${
              activeCategory === "기타"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => handleCategoryChange("기타")}
          >
            기타
          </button>
        </div>

        {/* 게시글 목록 */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-10 text-gray-400">
              게시글을 불러오는 중...
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-400">{error}</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              게시글이 없습니다.
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-[#25262b] rounded-lg p-4 hover:bg-[#2c2d32] transition-colors cursor-pointer"
                onClick={() => handlePostClick(post.id)}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white font-medium mb-1 truncate">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm truncate">
                      {post.content.replace(/<[^>]*>/g, "")}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <span>{post.memberNickname}</span>
                      <span>•</span>
                      <span>{getRelativeTime(post.createdAt)}</span>
                      {post.category.subCategory && (
                        <>
                          <span>•</span>
                          <span className="text-fuchsia-400/80">
                            {post.category.subCategory}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 whitespace-nowrap shrink-0">
                    조회 {post.viewCount} • 댓글 {post.commentCount || 0}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default RecruitPage;
