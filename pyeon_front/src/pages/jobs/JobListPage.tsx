import React, { useState, useEffect } from "react";
import JobBanner from "../../components/jobs/JobBanner";
import CategoryFilters from "../../components/jobs/CategoryFilters";
import JobList from "../../components/jobs/JobList";
import Pagination from "../../components/jobs/Pagination";
import NoticePreviewSection from "../../components/notice/NoticePreviewSection";
import { useJobFilters } from "../../hooks/useJobFilters";
import { Job } from "../../types/job";
import { JobSkeletonList } from "../../components/common/Skeleton";
import AdBanner from "../../components/common/AdBanner";

const ITEMS_PER_PAGE = 10;

const JobListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobsData, setJobsData] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        // Firebase Realtime Database에서 데이터 가져오기
        const response = await fetch(
          "https://pyeon-83d6a-default-rtdb.asia-southeast1.firebasedatabase.app/jobs.json"
        );

        if (!response.ok) {
          throw new Error("데이터를 불러오는데 실패했습니다.");
        }

        const data = await response.json();
        // Firebase는 배열을 객체 형태로 저장하므로 Object.values로 변환
        setJobsData(Array.isArray(data) ? data : Object.values(data) || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("구인 정보를 불러오는데 문제가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const {
    selectedSkills,
    selectedTypes,
    selectedPlatforms,
    currentPage,
    setCurrentPage,
    handleSkillChange,
    handleTypeChange,
    handlePlatformChange,
    filteredJobs,
  } = useJobFilters({
    jobs: jobsData || [],
    searchQuery,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query.trim() ? query : "");
  };

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (error) {
    return (
      <div className="container mx-auto px-4 max-w-5xl min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
        <div className="text-gray-200">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-5xl">
      <JobBanner />
      <NoticePreviewSection />
      <div className="bg-[#25262b] rounded-lg p-6 my-8">
        <CategoryFilters
          selectedSkills={selectedSkills}
          selectedTypes={selectedTypes}
          selectedPlatforms={selectedPlatforms}
          searchQuery={searchQuery}
          onSearch={handleSearch}
          onSkillChange={handleSkillChange}
          onTypeChange={handleTypeChange}
          onPlatformChange={handlePlatformChange}
        />
      </div>

      {isLoading ? (
        <JobSkeletonList count={ITEMS_PER_PAGE} />
      ) : (
        <>
          <JobList jobs={currentJobs} />
          {filteredJobs.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          {/* 댓글 아래 광고 */}
          <div className="mt-9 mb-6">
            <AdBanner
              slot="5409996939"
              format="rectangle"
              responsive={true}
              className="w-full"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default JobListPage;
