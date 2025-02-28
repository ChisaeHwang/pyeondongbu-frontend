import React, { memo } from "react";
import { Job } from "../../types/job";
import "../../styles/jobDetail.css";

interface JobContentProps {
  job: Job;
  onBack: () => void;
}

const JobContent = memo(({ job, onBack }: JobContentProps) => {
  const handleBackClick = () => {
    onBack();
  };

  return (
    <div className="my-8">
      <div className="bg-[#25262b] rounded-lg p-6 border border-[#2c2d32] shadow-sm">
        {/* 상단 정보 */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-100 mb-2">
              {job.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {job.videoType?.map((type: string) => (
                <span
                  key={type}
                  className="inline-block bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-500/30"
                >
                  {type}
                </span>
              ))}
              {job.skills?.map((skill: string) => (
                <span
                  key={skill}
                  className="inline-block bg-[#3a3b40] text-gray-300 px-3 py-1 rounded-full text-sm border border-[#3a3b40]/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <span
            className={`px-2 py-0.5 h-fit rounded text-xs ${
              job.platform === "youtube"
                ? "bg-red-500/20 text-red-300 border border-red-500/30"
                : job.platform === "x"
                ? "bg-[#2c2d32] text-white border border-[#404040]"
                : "bg-green-500/20 text-green-300 border border-green-500/30"
            }`}
          >
            {job.platform === "youtube"
              ? "YouTube"
              : job.platform === "x"
              ? "X"
              : "카페"}
          </span>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="job-content">
          <div
            className="text-gray-300 min-h-[200px]"
            dangerouslySetInnerHTML={{
              __html: job.content.replace(/\n/g, "<br>"),
            }}
          />
        </div>

        {/* 하단 정보 */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-[#2c2d32]">
          <button
            onClick={handleBackClick}
            className="bg-[#3a3b40] text-gray-200 px-4 py-2 rounded-lg hover:bg-[#434449] transition-colors"
          >
            뒤로 가기
          </button>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-400">{job.publisher.name}</span>
            <span className="text-gray-500">{job.publishedAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

JobContent.displayName = "JobContent";

export default JobContent;
