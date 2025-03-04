import React from "react";
import { formatDate } from "../../utils/dateUtils";
import { useAuth } from "../../contexts/AuthContext";

interface CommentItemProps {
  id: number;
  content: string;
  memberEmail: string;
  memberNickname: string;
  createdAt: string;
  modifiedAt: string;
  currentUserEmail?: string;
  editingCommentId: number | null;
  editedCommentContent: string;
  onEditStart: () => void;
  onEditCancel: () => void;
  onEditChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onEditSubmit: () => void;
  onDelete: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  id,
  content,
  memberEmail,
  memberNickname,
  createdAt,
  modifiedAt,
  currentUserEmail,
  editingCommentId,
  editedCommentContent,
  onEditStart,
  onEditCancel,
  onEditChange,
  onEditSubmit,
  onDelete,
}) => {
  const { user } = useAuth();
  const isEditing = editingCommentId === id;
  const isAuthor =
    currentUserEmail === memberEmail || user?.authority === "ROLE_ADMIN";

  return (
    <div className="border-b border-[#2c2d32] pb-4 last:border-0">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-medium text-gray-300">{memberNickname}</span>
          <span className="text-sm text-gray-500">{formatDate(createdAt)}</span>
          {modifiedAt !== createdAt && (
            <span className="text-xs text-gray-500">(수정됨)</span>
          )}
        </div>

        {isAuthor && (
          <div className="flex items-center gap-2">
            <button
              onClick={onEditStart}
              className="text-xs text-gray-400 hover:text-blue-500 transition-colors"
            >
              수정
            </button>
            <button
              onClick={onDelete}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors"
            >
              삭제
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mt-2">
          <textarea
            value={editedCommentContent}
            onChange={onEditChange}
            className="w-full bg-[#313338] text-white border border-[#404249] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[80px]"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={onEditCancel}
              className="px-3 py-1 bg-[#313338] text-gray-300 rounded-md hover:bg-[#383A40] transition-colors text-sm"
            >
              취소
            </button>
            <button
              onClick={onEditSubmit}
              className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
            >
              저장
            </button>
          </div>
        </div>
      ) : (
        <div className="text-gray-100">{content}</div>
      )}
    </div>
  );
};

export default CommentItem;
