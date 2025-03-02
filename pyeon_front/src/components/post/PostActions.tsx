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
  // 수정 버튼 클릭 핸들러
  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onEditClick();
  };

  // 삭제 버튼 클릭 핸들러
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onDeleteClick();
  };

  return (
    <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#404249]">
      {/* 좋아요 버튼 */}
      <button
        onClick={onLikeClick}
        className="flex items-center gap-1.5 text-gray-400 hover:text-gray-300"
      >
        {hasLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        <span>{likeCount}</span>
      </button>

      {/* 작성자만 볼 수 있는 수정/삭제 버튼 */}
      {isAuthor && (
        <div className="flex gap-3">
          <button
            onClick={handleEditClick}
            className="flex items-center gap-1.5 text-gray-400 hover:text-gray-300"
          >
            <FaEdit />
            <span>수정</span>
          </button>
          <button
            onClick={handleDeleteClick}
            className="flex items-center gap-1.5 text-gray-400 hover:text-red-400"
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
