import React from "react";
import { Job } from "../../types/job";
import JobCard from "./JobCard";
import AdInFeed from "../common/AdInFeed";

interface JobListProps {
  jobs: Job[];
  onJobClick?: (jobId: number) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, onJobClick }) => {
  // 날짜 기준 내림차순 정렬
  const sortedJobs = [...jobs].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // 게시글이 최소 2개 이상일 때만 광고 표시
  const shouldShowAds = sortedJobs.length >= 2;

  return (
    <div className="space-y-4">
      {sortedJobs.map((job, index) => {
        // 첫 번째 게시글 이후에 광고 표시
        const showFirstAd = shouldShowAds && index === 0;

        return (
          <React.Fragment key={job.id}>
            {/* 게시글 표시 */}
            <div
              className="opacity-0 animate-fade-in"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "forwards",
              }}
            >
              <JobCard job={job} index={index} />
            </div>

            {/* 첫 번째 게시글 이후 광고 표시 */}
            {showFirstAd && (
              <div
                className="opacity-0 animate-fade-in"
                style={{
                  animationDelay: `${index * 100 + 50}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <AdInFeed className="w-full min-h-[120px]" />
              </div>
            )}
          </React.Fragment>
        );
      })}

      {/* 마지막 게시글 이후 광고 표시 */}
      {shouldShowAds && (
        <div
          className="opacity-0 animate-fade-in"
          style={{
            animationDelay: `${sortedJobs.length * 100 + 50}ms`,
            animationFillMode: "forwards",
          }}
        >
          <AdInFeed className="w-full min-h-[120px]" />
        </div>
      )}
    </div>
  );
};

export default JobList;
