import React, { useState, useEffect } from "react";
import { PiPencilSimpleLine, PiBriefcaseFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../../components/common/SearchBar";
import Pagination from "../../components/jobs/Pagination";
import { getRelativeTime } from "../../utils/dateUtils";

interface Post {
  id: number;
  title: string;
  content: string;
  memberEmail?: string;
  memberNickname: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  modifiedAt?: string;
  category: {
    mainCategory: string;
    subCategory: string;
  };
  comments?: any[];
  hasLiked?: boolean;
}

// 목 데이터
const MOCK_POSTS: Post[] = [
  {
    id: 1,
    title: "편집자 구합니다 - 게임 컨텐츠 전문",
    content:
      "안녕하세요! 게임 컨텐츠를 주로 다루는 유튜버입니다. 주 3회 영상 업로드를 목표로 하고 있으며, 편집 스타일은 템포감 있고 밈을 활용한 편집을 선호합니다. 경력자 우대, 월 고정 급여로 진행하고자 합니다. 포트폴리오와 함께 연락 부탁드립니다.",
    memberEmail: "creator1@example.com",
    memberNickname: "게임크리에이터",
    viewCount: 245,
    likeCount: 18,
    commentCount: 7,
    createdAt: "2023-05-15T14:30:00",
    modifiedAt: "2023-05-15T14:30:00",
    category: {
      mainCategory: "구인",
      subCategory: "편집자",
    },
    comments: [],
    hasLiked: false,
  },
  {
    id: 2,
    title: "썸네일러 구인 - 뷰티 채널",
    content:
      "30만 구독자를 보유한 뷰티 채널입니다. 주 2회 업로드하는 영상의 썸네일 제작자를 찾고 있습니다. 트렌디한 디자인과 눈에 띄는 컬러감을 잘 살릴 수 있는 분을 원합니다. 건당 5만원, 지속적인 작업 가능하신 분 연락주세요.",
    memberEmail: "beauty@example.com",
    memberNickname: "뷰티여신",
    viewCount: 189,
    likeCount: 12,
    commentCount: 5,
    createdAt: "2023-05-14T10:15:00",
    modifiedAt: "2023-05-14T10:15:00",
    category: {
      mainCategory: "구인",
      subCategory: "썸네일러",
    },
    comments: [],
    hasLiked: false,
  },
  {
    id: 3,
    title: "급구! 다음주 촬영 편집 가능하신 분",
    content:
      "다음주 월요일에 촬영하는 브이로그 영상 편집 가능하신 분 구합니다. 약 30분 분량의 영상이며, 수요일까지 납품 필요합니다. 경험 많으신 분 우대합니다. 페이는 협의 가능하니 포트폴리오와 함께 DM 주세요.",
    memberEmail: "vlogger@example.com",
    memberNickname: "일상브이로거",
    viewCount: 132,
    likeCount: 5,
    commentCount: 10,
    createdAt: "2023-05-13T18:45:00",
    modifiedAt: "2023-05-13T19:20:00",
    category: {
      mainCategory: "구인",
      subCategory: "편집자",
    },
    comments: [],
    hasLiked: false,
  },
  {
    id: 4,
    title: "음식 ASMR 편집자 구합니다",
    content:
      "음식 ASMR 채널 운영 중입니다. 소리 편집에 강점이 있으신 편집자분을 모십니다. 주 1회 영상 업로드, 영상 길이는 15-20분 내외입니다. 장기적으로 함께할 수 있는 분을 찾고 있습니다. 경력자 우대, 급여는 영상당 15만원입니다.",
    memberEmail: "asmr@example.com",
    memberNickname: "푸드사운드",
    viewCount: 98,
    likeCount: 7,
    commentCount: 3,
    createdAt: "2023-05-12T09:30:00",
    modifiedAt: "2023-05-12T09:30:00",
    category: {
      mainCategory: "구인",
      subCategory: "편집자",
    },
    comments: [],
    hasLiked: false,
  },
  {
    id: 5,
    title: "유튜브 채널 아트 디자이너 구합니다",
    content:
      "새로 시작하는 교육 채널의 채널 아트, 로고, 인트로 등을 디자인해주실 분을 찾고 있습니다. 깔끔하고 프로페셔널한 스타일을 원합니다. 포트폴리오 확인 후 계약 진행하겠습니다. 예산은 협의 가능합니다.",
    memberEmail: "edu@example.com",
    memberNickname: "지식채널",
    viewCount: 76,
    likeCount: 4,
    commentCount: 2,
    createdAt: "2023-05-11T14:20:00",
    modifiedAt: "2023-05-11T14:20:00",
    category: {
      mainCategory: "구인",
      subCategory: "기타",
    },
    comments: [],
    hasLiked: false,
  },
  {
    id: 6,
    title: "주 2회 게임 하이라이트 편집자 구합니다",
    content:
      "롤, 배그 등 게임 스트리밍 하이라이트 편집자를 구합니다. 주 2회 10-15분 분량의 영상 편집이 필요합니다. 템포감 있는 편집과 효과음 활용을 잘하시는 분을 찾고 있습니다. 영상당 10만원, 지속적인 작업 원합니다.",
    memberEmail: "gamer@example.com",
    memberNickname: "게임스트리머",
    viewCount: 210,
    likeCount: 15,
    commentCount: 8,
    createdAt: "2023-05-10T20:15:00",
    modifiedAt: "2023-05-10T20:15:00",
    category: {
      mainCategory: "구인",
      subCategory: "편집자",
    },
    comments: [],
    hasLiked: false,
  },
  {
    id: 7,
    title: "여행 브이로그 썸네일 디자이너 구합니다",
    content:
      "여행 브이로그 채널을 운영 중입니다. 매주 업로드하는 영상의 썸네일을 제작해주실 분을 찾고 있습니다. 밝고 화사한 느낌의 디자인을 선호합니다. 건당 3만원, 장기적으로 함께할 분 연락주세요.",
    memberEmail: "travel@example.com",
    memberNickname: "세계여행자",
    viewCount: 124,
    likeCount: 9,
    commentCount: 4,
    createdAt: "2023-05-09T11:40:00",
    modifiedAt: "2023-05-09T11:40:00",
    category: {
      mainCategory: "구인",
      subCategory: "썸네일러",
    },
    comments: [],
    hasLiked: false,
  },
  {
    id: 8,
    title: "쇼츠 전문 편집자 구합니다",
    content:
      "유튜브 쇼츠 콘텐츠를 주로 제작하고 있습니다. 1분 내외의 짧은 영상을 임팩트 있게 편집해주실 분을 찾고 있습니다. 주 5회 업로드 예정이며, 빠른 턴어라운드 가능하신 분을 우대합니다. 건당 2만원, 월 고정급여로 전환 가능합니다.",
    memberEmail: "shorts@example.com",
    memberNickname: "쇼츠마스터",
    viewCount: 167,
    likeCount: 11,
    commentCount: 6,
    createdAt: "2023-05-08T15:30:00",
    modifiedAt: "2023-05-08T15:30:00",
    category: {
      mainCategory: "구인",
      subCategory: "편집자",
    },
    comments: [],
    hasLiked: false,
  },
  {
    id: 9,
    title: "키네틱 타이포그래피 가능한 편집자 구합니다",
    content:
      "음악 리뷰 채널입니다. 키네틱 타이포그래피를 활용한 편집이 가능하신 분을 찾고 있습니다. 월 4회 영상 업로드 예정이며, 영상 길이는 약 10분 내외입니다. 경력자 우대, 급여는 영상당 20만원입니다.",
    memberEmail: "music@example.com",
    memberNickname: "음악평론가",
    viewCount: 143,
    likeCount: 13,
    commentCount: 7,
    createdAt: "2023-05-07T13:20:00",
    modifiedAt: "2023-05-07T13:20:00",
    category: {
      mainCategory: "구인",
      subCategory: "편집자",
    },
    comments: [],
    hasLiked: false,
  },
  {
    id: 10,
    title: "3D 썸네일 디자이너 구합니다",
    content:
      "테크 리뷰 채널입니다. 3D 요소를 활용한 썸네일 제작이 가능하신 분을 찾고 있습니다. 주 1회 업로드하며, 건당 7만원 지급합니다. 포트폴리오와 함께 연락 부탁드립니다.",
    memberEmail: "tech@example.com",
    memberNickname: "테크리뷰어",
    viewCount: 187,
    likeCount: 14,
    commentCount: 5,
    createdAt: "2023-05-06T17:45:00",
    modifiedAt: "2023-05-06T17:45:00",
    category: {
      mainCategory: "구인",
      subCategory: "썸네일러",
    },
    comments: [],
    hasLiked: false,
  },
];

const HirePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("전체");

  // 목 데이터 사용
  useEffect(() => {
    // API 호출 대신 목 데이터 사용
    const fetchPosts = () => {
      try {
        setLoading(true);

        // 카테고리 필터링
        let filteredPosts = [...MOCK_POSTS];
        if (activeCategory !== "전체") {
          filteredPosts = filteredPosts.filter(
            (post) => post.category.subCategory === activeCategory
          );
        }

        // 페이지네이션 (한 페이지에 5개씩)
        const postsPerPage = 10;
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

        setPosts(paginatedPosts);
        setTotalPages(Math.ceil(filteredPosts.length / postsPerPage));
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

      // 검색 로직 (제목과 내용에서 검색)
      const searchResults = MOCK_POSTS.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase())
      );

      // 페이지네이션 리셋
      const postsPerPage = 5;
      setPosts(searchResults.slice(0, postsPerPage));
      setTotalPages(Math.ceil(searchResults.length / postsPerPage));
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
    navigate(`/hire/posts/${postId}`);
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
            <h1 className="text-2xl font-bold text-white">구인</h1>
            <PiBriefcaseFill className="text-2xl text-cyan-400" />
          </div>
          <Link to="/create?category=구인">
            <button className="flex items-center bg-[#313338] hover:bg-[#383A40] text-[#E5E7EB] pl-4 pr-3 py-2 rounded-md transition-colors duration-200">
              <span className="font-bold">글쓰기</span>
              <PiPencilSimpleLine className="ml-1 text-lg" />
            </button>
          </Link>
        </div>

        <SearchBar
          onSearch={handleSearch}
          placeholder="편집자, 썸네일러를 검색해보세요..."
        />

        {/* 구인 카테고리 */}
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
                          <span className="text-cyan-400/80">
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

export default HirePage;
