import React from "react";
import { FaHeart, FaRegHeart, FaEdit, FaTrash } from "react-icons/fa";

interface PostActionsProps {
  likeCount: number;
  hasLiked: boolean;
  isAuthor: boolean;
  onLikeClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  likeCount,
  hasLiked,
  isAuthor,
  onLikeClick,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className="flex justify-between items-center border-t border-[#2c2d32] pt-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onLikeClick}
          className={`flex items-center gap-1 ${
            hasLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
          } transition-colors`}
        >
          {hasLiked ? <FaHeart /> : <FaRegHeart />}
          <span>{likeCount}</span>
        </button>
      </div>

      {isAuthor && (
        <div className="flex items-center gap-2">
          <button
            onClick={onEditClick}
            className="flex items-center gap-1 text-gray-400 hover:text-blue-500 transition-colors"
          >
            <FaEdit />
            <span>수정</span>
          </button>
          <button
            onClick={onDeleteClick}
            className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <FaTrash />
            <span>삭제</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PostActions;
