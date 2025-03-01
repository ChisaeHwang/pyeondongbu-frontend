import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import PostHeader from "../../components/post/PostHeader";
import PostContent from "../../components/post/PostContent";
import PostActions from "../../components/post/PostActions";
import CommentList from "../../components/post/CommentList";

// 목 데이터 타입 정의
interface Comment {
  id: number;
  content: string;
  memberEmail: string;
  memberNickname: string;
  createdAt: string;
  modifiedAt: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  memberEmail: string;
  memberNickname: string;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  modifiedAt: string;
  category: {
    mainCategory: string;
    subCategory: string;
  };
  comments: Comment[];
  hasLiked: boolean;
}

// 목 데이터 - 게시글 상세 정보
const MOCK_POSTS: Record<string, Post> = {
  "1": {
    id: 1,
    title: "편집자 구합니다 - 게임 컨텐츠 전문",
    content:
      "안녕하세요! 게임 컨텐츠를 주로 다루는 유튜버입니다. 주 3회 영상 업로드를 목표로 하고 있으며, 편집 스타일은 템포감 있고 밈을 활용한 편집을 선호합니다.\n\n## 요구사항\n- 프리미어 프로 또는 파이널컷 사용 가능하신 분\n- 게임 컨텐츠에 대한 이해도가 높으신 분\n- 주 3회 영상 편집 가능하신 분\n- 빠른 소통과 피드백 반영 가능하신 분\n\n## 급여 조건\n- 월 고정급 협의 (경력에 따라 조정 가능)\n- 영상당 평균 10-15분 분량\n\n관심 있으신 분은 포트폴리오와 함께 연락 부탁드립니다. 감사합니다!",
    memberEmail: "creator1@example.com",
    memberNickname: "게임크리에이터",
    viewCount: 245,
    likeCount: 18,
    createdAt: "2023-05-15T14:30:00",
    modifiedAt: "2023-05-15T14:30:00",
    category: {
      mainCategory: "구인",
      subCategory: "편집자",
    },
    comments: [
      {
        id: 1,
        content: "포트폴리오 보내드렸습니다. 확인 부탁드려요!",
        memberEmail: "editor1@example.com",
        memberNickname: "게임편집자",
        createdAt: "2023-05-15T15:45:00",
        modifiedAt: "2023-05-15T15:45:00",
      },
      {
        id: 2,
        content:
          "편집 경력 2년 있습니다. 연락처 남겨주시면 포폴 보내드리겠습니다.",
        memberEmail: "editor2@example.com",
        memberNickname: "영상편집전문가",
        createdAt: "2023-05-15T16:20:00",
        modifiedAt: "2023-05-15T16:20:00",
      },
      {
        id: 3,
        content: "월 급여는 어느 정도 생각하고 계신가요?",
        memberEmail: "curious@example.com",
        memberNickname: "궁금이",
        createdAt: "2023-05-15T17:10:00",
        modifiedAt: "2023-05-15T17:10:00",
      },
    ],
    hasLiked: false,
  },
  "2": {
    id: 2,
    title: "썸네일러 구인 - 뷰티 채널",
    content:
      "30만 구독자를 보유한 뷰티 채널입니다. 주 2회 업로드하는 영상의 썸네일 제작자를 찾고 있습니다.\n\n## 원하는 스타일\n- 트렌디한 디자인\n- 눈에 띄는 컬러감\n- 깔끔하고 세련된 폰트 사용\n\n## 작업 조건\n- 건당 5만원\n- 수정 1회 포함\n- 작업 기한: 요청 후 24시간 이내\n\n지속적인 작업 가능하신 분 연락주세요. 포트폴리오 필수입니다.",
    memberEmail: "beauty@example.com",
    memberNickname: "뷰티여신",
    viewCount: 189,
    likeCount: 12,
    createdAt: "2023-05-14T10:15:00",
    modifiedAt: "2023-05-14T10:15:00",
    category: {
      mainCategory: "구인",
      subCategory: "썸네일러",
    },
    comments: [
      {
        id: 4,
        content: "포트폴리오 보내드렸습니다. 메일 확인 부탁드려요.",
        memberEmail: "designer1@example.com",
        memberNickname: "디자인고수",
        createdAt: "2023-05-14T11:30:00",
        modifiedAt: "2023-05-14T11:30:00",
      },
      {
        id: 5,
        content: "연락처 남겨주시면 작업물 보내드리겠습니다!",
        memberEmail: "thumbnailer@example.com",
        memberNickname: "썸네일장인",
        createdAt: "2023-05-14T13:45:00",
        modifiedAt: "2023-05-14T13:45:00",
      },
    ],
    hasLiked: false,
  },
};

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // 현재 페이지 타입 결정 (구인, 구직, 커뮤니티)
  const getPageType = () => {
    if (location.pathname.includes("/hire")) {
      return "hire";
    } else if (location.pathname.includes("/recruit")) {
      return "recruit";
    } else {
      return "community";
    }
  };

  const pageType = getPageType();

  // 게시글 데이터 가져오기 (목 데이터 사용)
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);

        // 실제 API 호출 대신 목 데이터 사용
        if (id && MOCK_POSTS[id]) {
          // 목 데이터에서 게시글 찾기
          setPost(MOCK_POSTS[id]);
        } else {
          // 목 데이터에 없는 경우 에러 처리
          setError("게시글을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("게시글을 불러오는 중 오류가 발생했습니다:", error);
        setError("게시글을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // 좋아요 토글
  const toggleLike = async () => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 목 데이터 업데이트
    setPost((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        hasLiked: !prev.hasLiked,
        likeCount: prev.hasLiked ? prev.likeCount - 1 : prev.likeCount + 1,
      };
    });
  };

  // 게시글 삭제
  const deletePost = async () => {
    if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      return;
    }

    // 목 데이터 삭제 (실제로는 삭제되지 않고 리다이렉트만 수행)
    alert("게시글이 삭제되었습니다.");

    if (pageType === "hire") {
      navigate("/hire");
    } else if (pageType === "recruit") {
      navigate("/recruit");
    } else {
      navigate("/community");
    }
  };

  // 댓글 작성
  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!newComment.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      setIsSubmittingComment(true);

      // 목 데이터에 댓글 추가
      const newCommentObj = {
        id: Date.now(), // 임시 ID 생성
        content: newComment,
        memberEmail: user?.email || "",
        memberNickname: user?.nickname || "사용자",
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
      };

      // 댓글 목록 업데이트
      setPost((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          comments: [...prev.comments, newCommentObj],
        };
      });

      setNewComment("");
    } catch (error) {
      console.error("댓글 작성 중 오류가 발생했습니다:", error);
      alert("댓글 작성 중 오류가 발생했습니다.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // 댓글 수정 시작
  const startEditComment = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditedCommentContent(comment.content);
  };

  // 댓글 수정 취소
  const cancelEditComment = () => {
    setEditingCommentId(null);
    setEditedCommentContent("");
  };

  // 댓글 수정 제출
  const submitEditComment = async (commentId: number) => {
    if (!editedCommentContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    // 목 데이터 댓글 수정
    setPost((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        comments: prev.comments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                content: editedCommentContent,
                modifiedAt: new Date().toISOString(),
              }
            : comment
        ),
      };
    });

    setEditingCommentId(null);
    setEditedCommentContent("");
  };

  // 댓글 삭제
  const deleteComment = async (commentId: number) => {
    if (!window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      return;
    }

    // 목 데이터 댓글 삭제
    setPost((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        comments: prev.comments.filter((comment) => comment.id !== commentId),
      };
    });
  };

  // 목록으로 돌아가기
  const goBack = () => {
    if (pageType === "hire") {
      navigate("/hire");
    } else if (pageType === "recruit") {
      navigate("/recruit");
    } else {
      navigate("/community");
    }
  };

  // 게시글 수정 페이지로 이동
  const goToEditPage = () => {
    navigate(`/edit/${id}?category=${post?.category.mainCategory}`);
  };

  // 로그인 페이지로 이동
  const goToLoginPage = () => {
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto text-center text-gray-400 py-12">
          게시글을 불러오는 중...
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto text-center text-gray-400 py-12">
          {error || "게시글을 찾을 수 없습니다."}
        </div>
      </div>
    );
  }

  const isAuthor = user?.email === post.memberEmail;

  return (
    <div className="container mx-auto px-4 max-w-5xl py-8">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={goBack}
        className="text-gray-400 hover:text-gray-300 mb-6 flex items-center gap-2"
      >
        <FaArrowLeft className="w-4 h-4" />
        목록으로 돌아가기
      </button>

      <div className="bg-[#25262b] rounded-lg p-6 border border-[#2c2d32]">
        {/* 게시글 헤더 */}
        <PostHeader
          title={post.title}
          memberNickname={post.memberNickname}
          createdAt={post.createdAt}
          modifiedAt={post.modifiedAt}
          viewCount={post.viewCount}
          commentCount={post.comments.length}
          mainCategory={post.category.mainCategory}
          subCategory={post.category.subCategory}
        />

        {/* 게시글 내용 */}
        <PostContent content={post.content} />

        {/* 게시글 하단 액션 */}
        <PostActions
          likeCount={post.likeCount}
          hasLiked={post.hasLiked}
          isAuthor={isAuthor}
          onLikeClick={toggleLike}
          onEditClick={goToEditPage}
          onDeleteClick={deletePost}
        />
      </div>

      {/* 댓글 섹션 */}
      <CommentList
        comments={post.comments}
        currentUserEmail={user?.email}
        isAuthenticated={isAuthenticated}
        newComment={newComment}
        editingCommentId={editingCommentId}
        editedCommentContent={editedCommentContent}
        isSubmittingComment={isSubmittingComment}
        onNewCommentChange={(e) => setNewComment(e.target.value)}
        onCommentSubmit={submitComment}
        onEditStart={startEditComment}
        onEditCancel={cancelEditComment}
        onEditChange={(e) => setEditedCommentContent(e.target.value)}
        onEditSubmit={submitEditComment}
        onDeleteComment={deleteComment}
        onLoginClick={goToLoginPage}
      />
    </div>
  );
};

export default PostDetailPage;
