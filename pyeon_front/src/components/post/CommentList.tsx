import React from "react";
import CommentItem from "./CommentItem";

interface Comment {
  id: number;
  content: string;
  memberEmail: string;
  memberNickname: string;
  createdAt: string;
  modifiedAt: string;
}

interface CommentListProps {
  comments: Comment[];
  currentUserEmail?: string;
  isAuthenticated: boolean;
  newComment: string;
  editingCommentId: number | null;
  editedCommentContent: string;
  isSubmittingComment: boolean;
  onNewCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCommentSubmit: (e: React.FormEvent) => void;
  onEditStart: (comment: Comment) => void;
  onEditCancel: () => void;
  onEditChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onEditSubmit: (commentId: number) => void;
  onDeleteComment: (commentId: number) => void;
  onLoginClick: () => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  currentUserEmail,
  isAuthenticated,
  newComment,
  editingCommentId,
  editedCommentContent,
  isSubmittingComment,
  onNewCommentChange,
  onCommentSubmit,
  onEditStart,
  onEditCancel,
  onEditChange,
  onEditSubmit,
  onDeleteComment,
  onLoginClick,
}) => {
  return (
    <div className="mt-8 bg-[#25262b] rounded-lg p-6 border border-[#2c2d32]">
      <h2 className="text-xl font-bold text-gray-100 mb-4">
        댓글 <span className="text-gray-400">({comments.length})</span>
      </h2>

      {/* 댓글 목록 */}
      <div className="space-y-4 mb-6">
        {comments.length === 0 ? (
          <div className="text-gray-400 text-center py-4">
            첫 댓글을 작성해보세요!
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              id={comment.id}
              content={comment.content}
              memberEmail={comment.memberEmail}
              memberNickname={comment.memberNickname}
              createdAt={comment.createdAt}
              modifiedAt={comment.modifiedAt}
              currentUserEmail={currentUserEmail}
              editingCommentId={editingCommentId}
              editedCommentContent={editedCommentContent}
              onEditStart={() => onEditStart(comment)}
              onEditCancel={onEditCancel}
              onEditChange={onEditChange}
              onEditSubmit={() => onEditSubmit(comment.id)}
              onDelete={() => onDeleteComment(comment.id)}
            />
          ))
        )}
      </div>

      {/* 댓글 작성 폼 */}
      {isAuthenticated ? (
        <form onSubmit={onCommentSubmit} className="mt-4">
          <textarea
            value={newComment}
            onChange={onNewCommentChange}
            placeholder="댓글을 작성해주세요..."
            className="w-full bg-[#313338] text-white border border-[#404249] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={isSubmittingComment}
              className={`px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors ${
                isSubmittingComment ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmittingComment ? "등록 중..." : "댓글 등록"}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-[#313338] text-gray-400 p-4 rounded-md text-center">
          댓글을 작성하려면{" "}
          <button
            onClick={onLoginClick}
            className="text-purple-400 hover:underline"
          >
            로그인
          </button>
          이 필요합니다.
        </div>
      )}
    </div>
  );
};

export default CommentList;
