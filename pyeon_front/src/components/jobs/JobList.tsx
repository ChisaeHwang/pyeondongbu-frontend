import React from "react";
import { Job } from "../../types/job";
import JobCard from "./JobCard";

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

  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default JobList;
