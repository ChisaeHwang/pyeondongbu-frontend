import React, { useState } from "react";
import jobsData from "../../assets/data/jobs.json";
import JobBanner from "../../components/jobs/JobBanner";
import CategoryFilters from "../../components/jobs/CategoryFilters";
import JobList from "../../components/jobs/JobList";
import Pagination from "../../components/jobs/Pagination";
import NoticePreviewSection from "../../components/notice/NoticePreviewSection";
import { useJobFilters } from "../../hooks/useJobFilters";
import { Job } from "../../types/job";

const ITEMS_PER_PAGE = 10;

const JobListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
    jobs: jobsData.jobs as Job[],
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

      <JobList jobs={currentJobs} />

      {filteredJobs.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default JobListPage;
