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
  subCategory: string;
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
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
        <span className="font-medium">{memberNickname}</span>
        <span>•</span>
        <span>{formatDate(createdAt)}</span>
        {modifiedAt !== createdAt && (
          <>
            <span>•</span>
            <span className="text-gray-500">(수정됨)</span>
          </>
        )}
        <span>•</span>
        <span>조회 {viewCount}</span>
        <span>•</span>
        <span>댓글 {commentCount}</span>
        {mainCategory && (
          <>
            <span>•</span>
            <span className="text-purple-400">{mainCategory}</span>
          </>
        )}
        {subCategory && (
          <>
            <span>•</span>
            <span className="text-fuchsia-400">{subCategory}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default PostHeader;
