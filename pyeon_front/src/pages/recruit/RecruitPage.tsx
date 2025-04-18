import React, { useState, useEffect, useRef } from "react";
import { PiPencilSimpleLine, PiIdentificationCardFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../../components/jobs/Pagination";
import axiosInstance from "../../utils/axios";
import { getRelativeTime } from "../../utils/dateUtils";
import { PostSkeletonList } from "../../components/common/Skeleton";
import AdBanner from "../../components/common/AdBanner";

// 백엔드 API의 PostSummaryResponse와 일치하는 인터페이스
interface Post {
  id: number;
  title: string;
  content: string; // 목록에서는 사용하지 않지만 기존 코드 호환성을 위해 유지
  memberNickname: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  modifiedAt: string;
  mainCategory: string;
  subCategory: string;
}

// MainCategory enum 값 정의
enum MainCategory {
  HIRE = "RECRUITMENT",
  RECRUIT = "JOB_SEEKING",
  COMMUNITY = "COMMUNITY",
}

// 서브 카테고리를 백엔드 enum 형식으로 변환
const convertSubCategoryToEnum = (subCategory: string) => {
  switch (subCategory) {
    case "편집자":
      return "EDITOR";
    case "썸네일러":
      return "THUMBNAILER";
    case "기타":
      return "OTHER";
    default:
      return null;
  }
};

// 서브 카테고리를 한글로 변환하는 함수
const convertSubCategoryToKorean = (category: string): string => {
  switch (category) {
    case "EDITOR":
      return "편집자";
    case "THUMBNAILER":
      return "썸네일러";
    case "OTHER":
      return "기타";
    default:
      return category;
  }
};

const RecruitPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("전체");
  const prevPostsCountRef = useRef<number>(10); // 이전 게시글 개수를 저장하는 ref

  // 게시글 데이터 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/api/posts", {
          params: {
            mainCategory: MainCategory.RECRUIT,
            subCategory:
              activeCategory !== "전체"
                ? convertSubCategoryToEnum(activeCategory)
                : null,
            page: currentPage - 1,
            size: 10,
          },
        });

        // 백엔드 API 응답 형식에 맞게 처리
        const newPosts = response.data.content;
        setPosts(newPosts);
        setTotalPages(response.data.totalPages);

        // 데이터가 있을 경우 개수 저장
        if (newPosts.length > 0) {
          prevPostsCountRef.current = newPosts.length;
        }
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
      // 공백 검색 시 초기 페이지 상태로 돌아가기
      try {
        setLoading(true);
        const response = await axiosInstance.get("/api/posts", {
          params: {
            mainCategory: MainCategory.RECRUIT,
            subCategory:
              activeCategory !== "전체"
                ? convertSubCategoryToEnum(activeCategory)
                : null,
            page: 0,
            size: 10,
          },
        });

        setPosts(response.data.content);
        setTotalPages(response.data.totalPages);
        setCurrentPage(1);
      } catch (error) {
        console.error("게시글을 불러오는 중 오류가 발생했습니다:", error);
        setError("게시글을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/posts", {
        params: {
          mainCategory: MainCategory.RECRUIT,
          searchText: query,
          page: 0,
          size: 10,
        },
      });

      // 백엔드 API 응답 형식에 맞게 처리
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
            <PiIdentificationCardFill className="text-2xl text-fuchsia-400" />
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
            <PostSkeletonList count={prevPostsCountRef.current} />
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
                      {post.content?.replace(/<[^>]*>/g, "")}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <span>{post.memberNickname}</span>
                      <span>•</span>
                      <span>{getRelativeTime(post.createdAt)}</span>
                      {post.subCategory && (
                        <>
                          <span>•</span>
                          <span className="text-cyan-400/80">
                            {convertSubCategoryToKorean(post.subCategory)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 whitespace-nowrap shrink-0">
                    조회 {post.viewCount} • 댓글 {post.commentCount || 0} •{" "}
                    <span className="text-red-400">
                      좋아요 {post.likeCount || 0}
                    </span>
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

        {/* 하단 광고 배너 */}
        <AdBanner />
      </div>
    </div>
  );
};

export default RecruitPage;
