import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JobContent from "../../components/jobs/JobContent";
import { Job } from "../../types/job";
import { JobDetailSkeleton } from "../../components/common/Skeleton";
import AdBanner from "../../components/ads/AdBanner";

const JobDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      setIsLoading(true);
      try {
        // Firebase Realtime Database에서 데이터 가져오기
        const response = await fetch(
          "https://pyeon-83d6a-default-rtdb.asia-southeast1.firebasedatabase.app/jobs.json"
        );

        if (!response.ok) {
          throw new Error("데이터를 불러오는데 실패했습니다");
        }

        const data = await response.json();
        // Firebase는 배열을 객체 형태로 저장하므로 Object.values로 변환
        const jobsArray = Array.isArray(data) ? data : Object.values(data);
        const foundJob = jobsArray.find((job: Job) => job.id === Number(id));
        setJob(foundJob || null);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("구인 정보를 불러오는데 문제가 발생했습니다");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetail();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-0 max-w-full min-h-[calc(100vh-3.5rem)]">
        <JobDetailSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-0 max-w-full min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
        <div className="text-gray-200">{error}</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-0 max-w-full min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
        <div className="text-gray-200">찾을 수 없는 구인 공고입니다.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-0 max-w-full min-h-[calc(100vh-3.5rem)]">
      {/* 게시글 상단 광고 */}
      <div className="my-6">
        <AdBanner position="content-top" />
      </div>

      <JobContent job={job} onBack={handleBack} />
    </div>
  );
};

export default JobDetailPage;
