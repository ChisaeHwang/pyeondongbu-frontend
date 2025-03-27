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

// 메인 카테고리를 한글로 변환하는 함수
const convertMainCategoryToKorean = (category: string): string => {
  switch (category) {
    case "RECRUITMENT":
      return "구인";
    case "JOB_SEEKING":
      return "구직";
    case "COMMUNITY":
      return "커뮤니티";
    default:
      return category;
  }
};

// 서브 카테고리를 한글로 변환하는 함수
const convertSubCategoryToKorean = (category: string): string => {
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
    default:
      return category;
  }
};

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
            <span className="text-purple-400">
              {convertMainCategoryToKorean(mainCategory)}
            </span>
          </>
        )}
        {subCategory && (
          <>
            <span>•</span>
            <span className="text-fuchsia-400">
              {convertSubCategoryToKorean(subCategory)}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default PostHeader;
