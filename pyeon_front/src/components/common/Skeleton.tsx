import React from "react";

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  width = "100%",
  height = "20px",
  rounded = "md",
}) => {
  return (
    <div
      className={`animate-pulse bg-[#2c2d32] ${className}`}
      style={{
        width,
        height,
        borderRadius:
          rounded === "full"
            ? "9999px"
            : rounded === "md"
            ? "0.375rem"
            : rounded,
      }}
    />
  );
};

export const PostSkeleton: React.FC = () => {
  return (
    <div className="bg-[#25262b] rounded-lg p-4 hover:bg-[#2c2d32] transition-colors">
      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0 flex-1">
          <Skeleton className="mb-2" height="24px" width="70%" />
          <Skeleton className="mb-3" height="16px" width="90%" />
          <div className="flex items-center gap-2 mt-2">
            <Skeleton width="80px" height="14px" />
            <div className="w-1 h-1 rounded-full bg-[#2c2d32]" />
            <Skeleton width="60px" height="14px" />
          </div>
        </div>
        <Skeleton width="120px" height="14px" />
      </div>
    </div>
  );
};

export const PostSkeletonList: React.FC<{ count?: number }> = ({
  count = 5,
}) => {
  return (
    <div className="space-y-3">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <PostSkeleton key={index} />
        ))}
    </div>
  );
};

export const PostDetailSkeleton: React.FC = () => {
  return (
    <div className="bg-[#25262b] rounded-lg p-6 border border-[#2c2d32]">
      {/* 게시글 헤더 스켈레톤 */}
      <div className="mb-6">
        <Skeleton className="mb-3" height="32px" width="80%" />
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton width="100px" height="16px" />
          <div className="w-1 h-1 rounded-full bg-[#2c2d32]" />
          <Skeleton width="80px" height="16px" />
          <div className="w-1 h-1 rounded-full bg-[#2c2d32]" />
          <Skeleton width="60px" height="16px" />
        </div>
      </div>

      {/* 게시글 내용 스켈레톤 */}
      <div className="space-y-4 mb-6">
        <Skeleton height="16px" width="100%" />
        <Skeleton height="16px" width="95%" />
        <Skeleton height="16px" width="90%" />
        <Skeleton height="16px" width="97%" />
        <Skeleton height="16px" width="85%" />
      </div>

      {/* 게시글 하단 액션 스켈레톤 */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#404249]">
        <Skeleton width="60px" height="20px" />
        <div className="flex gap-3">
          <Skeleton width="50px" height="20px" />
          <Skeleton width="50px" height="20px" />
        </div>
      </div>
    </div>
  );
};

export const CommentSkeleton: React.FC = () => {
  return (
    <div className="border-b border-[#2c2d32] py-4">
      <div className="flex justify-between mb-2">
        <div className="flex items-center gap-2">
          <Skeleton width="80px" height="16px" rounded="md" />
          <div className="w-1 h-1 rounded-full bg-[#2c2d32]" />
          <Skeleton width="60px" height="16px" rounded="md" />
        </div>
      </div>
      <Skeleton className="mb-2" height="16px" width="90%" />
      <Skeleton height="16px" width="70%" />
    </div>
  );
};

export const CommentSkeletonList: React.FC<{ count?: number }> = ({
  count = 3,
}) => {
  return (
    <div className="mt-8 bg-[#25262b] rounded-lg p-6 border border-[#2c2d32]">
      <Skeleton className="mb-4" height="24px" width="120px" />
      <div className="space-y-2">
        {Array(count)
          .fill(0)
          .map((_, index) => (
            <CommentSkeleton key={index} />
          ))}
      </div>
    </div>
  );
};

export const JobSkeleton: React.FC = () => {
  return (
    <div className="bg-[#25262b] rounded-lg p-4 hover:bg-[#2c2d32] transition-colors">
      <div className="flex flex-col">
        <div className="flex justify-between mb-3">
          <Skeleton width="60%" height="24px" />
          <Skeleton width="80px" height="24px" />
        </div>
        <div className="mb-3">
          <Skeleton width="40%" height="16px" />
        </div>
        <div className="flex gap-2 mb-3">
          <Skeleton width="60px" height="24px" rounded="full" />
          <Skeleton width="80px" height="24px" rounded="full" />
          <Skeleton width="70px" height="24px" rounded="full" />
        </div>
        <div className="mt-auto flex justify-between items-center">
          <Skeleton width="120px" height="16px" />
          <Skeleton width="100px" height="16px" />
        </div>
      </div>
    </div>
  );
};

export const JobSkeletonList: React.FC<{ count?: number }> = ({
  count = 5,
}) => {
  return (
    <div className="space-y-4">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <JobSkeleton key={index} />
        ))}
    </div>
  );
};

export const JobDetailSkeleton: React.FC = () => {
  return (
    <div className="my-8">
      <div className="bg-[#25262b] rounded-lg p-6 border border-[#2c2d32] shadow-sm">
        {/* 상단 정보 */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <Skeleton width="70%" height="32px" className="mb-2" />
            <div className="flex flex-wrap gap-2 mt-4">
              <Skeleton width="80px" height="28px" rounded="full" />
              <Skeleton width="100px" height="28px" rounded="full" />
              <Skeleton width="90px" height="28px" rounded="full" />
            </div>
          </div>
          <Skeleton width="60px" height="24px" rounded="md" />
        </div>

        {/* 컨텐츠 영역 */}
        <div className="job-content space-y-4">
          <Skeleton width="90%" height="20px" />
          <Skeleton width="85%" height="20px" />
          <Skeleton width="40%" height="20px" />

          <div className="mt-6">
            <Skeleton width="100%" height="100px" />
          </div>

          <div className="mt-6 space-y-2">
            <Skeleton width="60%" height="20px" />
            <Skeleton width="90%" height="20px" />
            <Skeleton width="70%" height="20px" />
          </div>
        </div>

        {/* 하단 정보 */}
        <div className="flex justify-between mt-8">
          <Skeleton width="120px" height="20px" />
          <Skeleton width="150px" height="20px" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
