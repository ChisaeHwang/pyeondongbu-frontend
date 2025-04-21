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

  // 광고를 표시할 간격 (4개의 게시글마다 광고 표시)
  const AD_INTERVAL = 4;

  // 게시글이 AD_INTERVAL*2개 이상일 때만 광고 표시
  const shouldShowAds = sortedJobs.length >= AD_INTERVAL * 2;

  return (
    <div className="space-y-4">
      {sortedJobs.map((job, index) => {
        // 광고를 표시할 위치인지 확인 (4개 게시물마다 광고 표시)
        const showAd =
          shouldShowAds &&
          index > 0 &&
          index % AD_INTERVAL === 0 &&
          index < sortedJobs.length - 1;

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

            {/* 광고 표시 (게시글 다음에 광고 위치) */}
            {showAd && (
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
    </div>
  );
};

export default JobList;
