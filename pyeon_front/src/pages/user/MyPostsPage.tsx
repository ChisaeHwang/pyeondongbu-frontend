import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../utils/axios";
import { getRelativeTime } from "../../utils/dateUtils";
import { PostSkeletonList } from "../../components/common/Skeleton";
import AdBanner from "../../components/common/AdBanner";

interface Post {
  id: number;
  title: string;
  content: string;
  memberNickname: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  mainCategory: string;
  subCategory: string;
}

// MainCategory enum 값 정의
enum MainCategory {
  HIRE = "RECRUITMENT",
  RECRUIT = "JOB_SEEKING",
  COMMUNITY = "COMMUNITY",
}

const MyPostsPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("전체");
  const prevPostsCountRef = useRef<number>(10); // 이전 게시글 개수를 저장하는 ref

  // 게시글 데이터 가져오기
  useEffect(() => {
    const fetchMyPosts = async () => {
      if (!isAuthenticated) return;

      try {
        setLoading(true);

        // API 호출
        const response = await axiosInstance.get("/api/posts/my");
        let filteredPosts = response.data.content.map((post: any) => ({
          ...post,
          content: post.content || "",
          commentCount: post.commentCount || 0,
          mainCategory: convertMainCategoryToDisplay(post.mainCategory),
          subCategory: convertSubCategoryToDisplay(post.subCategory),
        }));

        // 카테고리 필터링
        if (activeCategory !== "전체") {
          filteredPosts = filteredPosts.filter(
            (post: Post) => post.mainCategory === activeCategory
          );
        }

        // 게시글 개수 저장
        prevPostsCountRef.current = filteredPosts.length;
        setPosts(filteredPosts);
      } catch (error) {
        console.error("게시글을 불러오는 중 오류가 발생했습니다:", error);
        setError("게시글을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, [activeCategory, isAuthenticated]);

  // 백엔드 enum을 프론트엔드 표시용으로 변환
  const convertMainCategoryToDisplay = (category: string) => {
    switch (category) {
      case "RECRUITMENT":
        return "구인";
      case "JOB_SEEKING":
        return "구직";
      case "COMMUNITY":
        return "커뮤니티";
      default:
        return "커뮤니티";
    }
  };

  const convertSubCategoryToDisplay = (category: string) => {
    switch (category) {
      case "EDITOR":
        return "편집자";
      case "THUMBNAILER":
        return "썸네일러";
      case "OTHER":
        return "기타";
      case "FREE":
        return "자유";
      case "QUESTION":
        return "질문";
      case "INFORMATION":
        return "정보";
      case "ALL":
        return "전체";
      default:
        return "기타";
    }
  };

  // 게시글 클릭 시 상세 페이지로 이동
  const handlePostClick = (post: Post) => {
    const { id } = post;
    const mainCategory = post.mainCategory;

    if (mainCategory === MainCategory.HIRE) {
      navigate(`/hire/posts/${id}`);
    } else if (mainCategory === MainCategory.RECRUIT) {
      navigate(`/recruit/posts/${id}`);
    } else {
      navigate(`/community/posts/${id}`);
    }
  };

  // 카테고리 변경
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto text-center text-gray-400 py-12">
          로그인이 필요합니다.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">내가 쓴 글</h1>

        {/* 카테고리 필터 */}
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
              activeCategory === "구인"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => handleCategoryChange("구인")}
          >
            구인
          </button>
          <button
            className={`transition-colors duration-200 ${
              activeCategory === "구직"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => handleCategoryChange("구직")}
          >
            구직
          </button>
          <button
            className={`transition-colors duration-200 ${
              activeCategory === "커뮤니티"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => handleCategoryChange("커뮤니티")}
          >
            커뮤니티
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
                onClick={() => handlePostClick(post)}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white font-medium mb-1 truncate">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm truncate">
                      {post.content?.replace(/<[^>]*>/g, "") || ""}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <span>{getRelativeTime(post.createdAt)}</span>
                      <span>•</span>
                      <span
                        className={`${
                          post.mainCategory === "구인"
                            ? "text-cyan-400/80"
                            : post.mainCategory === "구직"
                            ? "text-fuchsia-400/80"
                            : "text-purple-400/80"
                        }`}
                      >
                        {post.mainCategory}
                      </span>
                      {post.subCategory && (
                        <>
                          <span>•</span>
                          <span className="text-gray-400">
                            {post.subCategory}
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
        <div className="mt-6">
          <AdBanner
            slot="5409996939"
            format="rectangle"
            responsive={true}
            className="w-full min-h-[250px]"
          />
        </div>
      </div>
    </div>
  );
};

export default MyPostsPage;
