import React from "react";
import { Job } from "../../types/job";
import JobCard from "./JobCard";

interface JobListProps {
  jobs: Job[];
  onJobClick: (jobId: number) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, onJobClick }) => {
  return (
    <div className="space-y-4">
      {jobs.map((job, index) => (
        <div
          key={job.id}
          className="opacity-0 animate-fade-in"
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: "forwards",
          }}
        >
          <JobCard job={job} index={index} onClick={() => onJobClick(job.id)} />
        </div>
      ))}
    </div>
  );
};

export default JobList;
