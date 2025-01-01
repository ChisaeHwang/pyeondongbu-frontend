import React from "react";
import { Link } from "react-router-dom";
import { Job } from "../../types/job";
import { formatDate } from "../../utils/dateUtils";

interface JobCardProps {
  job: Job;
  index: number;
  onClick?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, index, onClick }) => {
  const contentPreview =
    job.content.replace(/<[^>]*>/g, "").slice(0, 100) +
    (job.content.length > 100 ? "..." : "");

  // 태그 제한 함수
  const getDisplayTags = <T,>(
    tags: T[] | undefined,
    isMobile: boolean
  ): T[] => {
    if (!tags) return [];
    if (isMobile) {
      return tags.slice(0, 1);
    }
    return tags;
  };

  // 플랫폼 표시 텍스트
  const getPlatformText = (platform: string): string => {
    if (platform === "youtube") return "YouTube";
    if (platform === "x") return "X";
    return "카페";
  };

  // 플랫폼 스타일
  const getPlatformStyle = (platform: string): string => {
    if (platform === "youtube") {
      return "bg-red-500/20 text-red-300 border border-red-500/30";
    }
    if (platform === "x") {
      return "bg-[#2c2d32] text-white border border-[#404040]";
    }
    return "bg-green-500/20 text-green-300 border border-green-500/30";
  };

  const isMobile = window.innerWidth < 768;
  const videoTypeTags = getDisplayTags(job.videoType, isMobile);
  const skillTags = getDisplayTags(job.skills, isMobile);

  return (
    <Link
      to={`/jobs/${job.id}`}
      className="block bg-[#25262b] rounded-lg border border-[#2c2d32] overflow-hidden hover:border-[#3a3b40] transition-colors"
      onClick={onClick}
    >
      <div className="p-4">
        {/* 상단: 이미지와 제목/내용 */}
        <div className="flex gap-4">
          {/* 왼쪽: 이미지 */}
          <div className="flex flex-col gap-2">
            <div className="w-[120px] h-[67.5px] md:w-[180px] md:h-[101.25px] bg-[#1a1b1e] rounded overflow-hidden">
              <img
                src={job.publisher.image}
                alt={job.publisher.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* 오른쪽: 제목과 내용 */}
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-100 font-medium mb-2 line-clamp-1 text-base md:text-lg">
              {job.title}
            </h3>
            <p className="text-gray-400 text-sm md:text-base line-clamp-2 md:w-[70%]">
              {contentPreview}
            </p>
          </div>
        </div>

        {/* 하단: 태그와 정보 */}
        <div className="mt-3 mb-0.5 flex justify-between items-end">
          {/* 왼쪽: 태그들 (모바일: 최대 2개, 데스크탑: 전체 표시) */}
          <div className="flex flex-wrap gap-1.5 max-w-[50%] md:max-w-[60%]">
            {/* 영상 타입 태그 (모바일: 1개, 데스크탑: 전체) */}
            {videoTypeTags.map((type) => (
              <span
                key={type}
                className="inline-block bg-blue-500/20 text-blue-300 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-[10px] md:text-[14px] border border-blue-500/30"
              >
                {type}
              </span>
            ))}
            {/* 스킬 태그 (모바일: 1개, 데스크탑: 전체) */}
            {skillTags.map((skill) => (
              <span
                key={skill}
                className="inline-block bg-[#3a3b40] text-gray-300 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-[10px] md:text-[14px]"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* 오른쪽: 하단 정보 */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
            <span className="font-medium">{job.publisher.name}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500">{formatDate(job.publishedAt)}</span>
            <span className="text-gray-500">•</span>
            <span
              className={`px-2 py-0.5 md:px-2.5 md:py-1 rounded text-[10px] md:text-sm ${getPlatformStyle(
                job.platform
              )}`}
            >
              {getPlatformText(job.platform)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
