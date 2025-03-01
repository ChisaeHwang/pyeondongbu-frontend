import React from "react";
import { formatDate } from "../../utils/dateUtils";

interface PostHeaderProps {
  title: string;
  memberNickname: string;
  createdAt: string;
  modifiedAt: string;
  viewCount: number;
  commentCount: number;
  mainCategory: string;
  subCategory?: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  title,
  memberNickname,
  createdAt,
  modifiedAt,
  viewCount,
  commentCount,
  mainCategory,
  subCategory,
}) => {
  return (
    <div className="border-b border-[#2c2d32] pb-4 mb-6">
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`px-2 py-0.5 rounded text-sm ${
            mainCategory === "구인"
              ? "bg-cyan-500/20 text-cyan-400"
              : mainCategory === "구직"
              ? "bg-fuchsia-500/20 text-fuchsia-400"
              : "bg-purple-500/20 text-purple-400"
          }`}
        >
          {mainCategory}
        </span>
        {subCategory && (
          <span className="bg-gray-500/20 text-gray-400 px-2 py-0.5 rounded text-sm">
            {subCategory}
          </span>
        )}
      </div>

      <h1 className="text-2xl font-bold text-gray-100 mb-2">{title}</h1>

      <div className="flex justify-between items-center text-sm">
        <div className="text-gray-400">
          <span className="font-medium text-gray-300">{memberNickname}</span>
          <span className="mx-2">•</span>
          <span>{formatDate(createdAt)}</span>
          {modifiedAt !== createdAt && (
            <span className="ml-2 text-gray-500">(수정됨)</span>
          )}
        </div>

        <div className="text-gray-400">
          <span>조회 {viewCount}</span>
          <span className="mx-2">•</span>
          <span>댓글 {commentCount}</span>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
