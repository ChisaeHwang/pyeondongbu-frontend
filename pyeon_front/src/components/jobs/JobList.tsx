import React, { useEffect, useRef } from "react";
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

  // 상단 광고 ref
  const topAdRef = useRef<HTMLDivElement>(null);

  // 광고 컨테이너 가시성 확인
  useEffect(() => {
    if (shouldShowAds && topAdRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // 광고가 화면에 표시될 때 opacity 클래스 추가
              topAdRef.current?.classList.add("opacity-100");
              observer.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(topAdRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [shouldShowAds, sortedJobs]);

  return (
    <div className="space-y-4">
      {/* 상단 광고 배치 - 모든 게시글 위에 표시 */}
      {shouldShowAds && (
        <div
          ref={topAdRef}
          className="opacity-0 transition-opacity duration-500 mb-6"
          style={{
            minHeight: "250px", // 광고 로드 전 높이 확보
          }}
        >
          <AdInFeed
            className="w-full"
            adPosition="first"
            id={`ad-top-${Date.now()}`} // 고유 ID 보장
          />
        </div>
      )}

      {/* 게시글 목록 */}
      {sortedJobs.map((job, index) => (
        <div
          key={job.id}
          className="opacity-0 animate-fade-in"
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: "forwards",
          }}
        >
          <JobCard job={job} index={index} />
        </div>
      ))}

      {/* 마지막 광고 - 여전히 모든 게시글 아래에 표시 */}
      {shouldShowAds && (
        <div
          className="opacity-0 animate-fade-in mt-6"
          style={{
            animationDelay: `${sortedJobs.length * 100 + 50}ms`,
            animationFillMode: "forwards",
            minHeight: "250px", // 광고 로드 전 높이 확보
          }}
        >
          <AdInFeed
            className="w-full"
            adPosition="second"
            id={`ad-bottom-${Date.now()}`} // 고유 ID 보장
          />
        </div>
      )}
    </div>
  );
};

export default JobList;
