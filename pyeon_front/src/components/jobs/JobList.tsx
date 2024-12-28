import React from "react";
import { Job } from "../../types/job";

interface JobListProps {
  jobs: Job[];
  onJobClick: (id: number) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, onJobClick }) => {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div
          key={job.id}
          onClick={() => onJobClick(job.id)}
          className="bg-[#25262b] rounded-lg p-4 cursor-pointer hover:bg-[#2c2d32] transition-colors"
        >
          <h3 className="text-gray-100 font-medium mb-2">{job.title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <img
              src={job.publisher.image || "https://via.placeholder.com/32"}
              alt={job.publisher.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-gray-400 text-sm">{job.publisher.name}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.skills?.map((skill) => (
              <span
                key={skill}
                className="bg-[#2c2d32] text-gray-400 text-xs px-2 py-1 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;
