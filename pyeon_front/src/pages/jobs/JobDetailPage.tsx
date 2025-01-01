import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import jobsData from "../../assets/data/jobs.json";
import JobContent from "../../components/jobs/JobContent";

const JobDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobsData.jobs.find((job) => job.id === Number(id));

  const handleBack = () => {
    navigate(-1);
  };

  if (!job) {
    return (
      <div className="container mx-auto px-4 max-w-5xl min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
        <div className="text-gray-200">찾을 수 없는 구인 공고입니다.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-5xl min-h-[calc(100vh-3.5rem)]">
      <JobContent job={job} onBack={handleBack} />
    </div>
  );
};

export default JobDetailPage;
