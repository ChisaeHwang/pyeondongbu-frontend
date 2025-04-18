import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import PostHeader from "../../components/post/PostHeader";
import PostContent from "../../components/post/PostContent";
import PostActions from "../../components/post/PostActions";
import CommentList from "../../components/post/CommentList";
import AdVertBanner from "../../components/common/AdBanner";
import axiosInstance from "../../utils/axios";
import { Post, Comment, PostResponse } from "../../types/post";
import {
  PostDetailSkeleton,
  CommentSkeletonList,
} from "../../components/common/Skeleton";
import toast from "react-hot-toast";

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

  // 게시글 데이터 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        setLoading(true);

        // API 호출 - withCredentials가 axios 인스턴스에 설정되어 있으므로 쿠키가 자동으로 전송됨
        const response = await axiosInstance.get<PostResponse>(
          `/api/posts/${id}`
        );

        // 백엔드 API 응답 데이터를 Post 타입으로 변환
        const postData: Post = {
          id: response.data.id,
          title: response.data.title,
          content: response.data.content,
          memberEmail: response.data.memberEmail,
          memberNickname: response.data.memberNickname,
          viewCount: response.data.viewCount,
          likeCount: response.data.likeCount,
          createdAt: response.data.createdAt,
          modifiedAt: response.data.modifiedAt,
          mainCategory: response.data.mainCategory,
          subCategory: response.data.subCategory,
          comments: response.data.comments,
          hasLiked: response.data.hasLiked,
        };

        setPost(postData);
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
      toast.error("로그인이 필요합니다.");
      return;
    }

    if (!id || !post) return;

    try {
      // API 호출 - withCredentials가 axios 인스턴스에 설정되어 있으므로 쿠키가 자동으로 전송됨
      await axiosInstance.post(`/api/posts/${id}/like`);

      // 상태 업데이트
      setPost((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          hasLiked: !prev.hasLiked,
          likeCount: prev.hasLiked ? prev.likeCount - 1 : prev.likeCount + 1,
        };
      });
    } catch (error) {
      console.error("좋아요 처리 중 오류가 발생했습니다:", error);
      toast.error("좋아요 처리 중 오류가 발생했습니다.");
    }
  };

  // 게시글 삭제
  const deletePost = async () => {
    if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      return;
    }

    if (!id) return;

    try {
      // API 호출 - URL 파라미터의 id 사용
      await axiosInstance.delete(`/api/posts/${id}`);

      toast.success("게시글이 삭제되었습니다.");

      // 목록 페이지로 이동
      if (pageType === "hire") {
        navigate("/hire");
      } else if (pageType === "recruit") {
        navigate("/recruit");
      } else {
        navigate("/community");
      }
    } catch (error) {
      console.error("게시글 삭제 중 오류가 발생했습니다:", error);
      toast.error("게시글 삭제 중 오류가 발생했습니다.");
    }
  };

  // 댓글 작성
  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    if (!newComment.trim()) {
      toast.error("댓글 내용을 입력해주세요.");
      return;
    }

    if (!id) return;

    try {
      setIsSubmittingComment(true);

      // API 호출
      const response = await axiosInstance.post(`/api/posts/${id}/comments`, {
        content: newComment,
      });

      // 새 댓글 객체 생성
      const newCommentObj: Comment = {
        id: response.data, // API가 새 댓글의 ID를 반환
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
      toast.error("댓글 작성 중 오류가 발생했습니다.");
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
      toast.error("댓글 내용을 입력해주세요.");
      return;
    }

    if (!id) return;

    try {
      // API 호출
      await axiosInstance.put(`/api/posts/${id}/comments/${commentId}`, {
        content: editedCommentContent,
      });

      // 댓글 목록 업데이트
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
      toast.success("댓글이 수정되었습니다.");
    } catch (error) {
      console.error("댓글 수정 중 오류가 발생했습니다:", error);
      toast.error("댓글 수정 중 오류가 발생했습니다.");
    }
  };

  // 댓글 삭제
  const deleteComment = async (commentId: number) => {
    if (!window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      return;
    }

    if (!id) return;

    try {
      // API 호출
      await axiosInstance.delete(`/api/posts/${id}/comments/${commentId}`);

      // 댓글 목록 업데이트
      setPost((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          comments: prev.comments.filter((comment) => comment.id !== commentId),
        };
      });

      toast.success("댓글이 삭제되었습니다.");
    } catch (error) {
      console.error("댓글 삭제 중 오류가 발생했습니다:", error);
      toast.error("댓글 삭제 중 오류가 발생했습니다.");
    }
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
    if (!post || !id) {
      console.error("게시글 정보가 없어 수정 페이지로 이동할 수 없습니다.");
      return;
    }

    console.log("수정 페이지로 이동:", {
      id,
      category: post.mainCategory,
      path: location.pathname,
    });

    // 카테고리에 따라 적절한 URL로 이동
    try {
      if (post.mainCategory === "RECRUITMENT") {
        navigate(`/edit/hire/${id}`);
      } else if (post.mainCategory === "JOB_SEEKING") {
        navigate(`/edit/recruit/${id}`);
      } else {
        navigate(`/edit/community/${id}`);
      }
    } catch (error) {
      console.error("수정 페이지 이동 중 오류 발생:", error);
    }
  };

  // 로그인 페이지로 이동
  const goToLoginPage = () => {
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={goBack}
            className="text-gray-400 hover:text-gray-300 mb-6 flex items-center gap-2"
          >
            <FaArrowLeft className="w-4 h-4" />
            목록으로 돌아가기
          </button>

          <PostDetailSkeleton />
          <CommentSkeletonList />
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

  const isAuthor =
    user?.email === post.memberEmail || user?.authority === "ROLE_ADMIN";

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
          mainCategory={post.mainCategory}
          subCategory={post.subCategory}
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

      {/* 광고 배너 */}
      <div className="mt-6 mb-4 bg-[#25262b] rounded-lg p-4 border border-[#2c2d32]">
        <div className="flex justify-center items-center">
          <AdVertBanner
            adClient="ca-pub-9895707756303015"
            adSlot="5409996939"
            width={728}
            height={90}
            format="horizontal"
            responsive={true}
            className="my-2 w-full"
          />
        </div>
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
