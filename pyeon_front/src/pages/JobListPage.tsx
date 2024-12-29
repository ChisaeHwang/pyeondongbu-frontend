import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import jobsData from "../assets/data/jobs.json";
import JobBanner from "../components/jobs/JobBanner";
import CategoryFilters from "../components/jobs/CategoryFilters";
import JobList from "../components/jobs/JobList";
import Pagination from "../components/jobs/Pagination";
import { Job } from "../types/job";

const ITEMS_PER_PAGE = 10;

interface JobListPageProps {
  searchQuery: string;
}

const JobListPage: React.FC<JobListPageProps> = ({ searchQuery }) => {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSkillChange = useCallback((skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
    setCurrentPage(1);
  }, []);

  const handleTypeChange = useCallback((type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  }, []);

  const handlePlatformChange = useCallback((platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
    setCurrentPage(1);
  }, []);

  const filteredJobs = (jobsData.jobs as Job[]).filter((job: Job) => {
    const searchMatch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.content.toLowerCase().includes(searchQuery.toLowerCase());
    const skillMatch =
      selectedSkills.length === 0 ||
      selectedSkills.some((selectedSkill) =>
        job.skills.some(
          (jobSkill) => jobSkill.toLowerCase() === selectedSkill.toLowerCase()
        )
      );
    const typeMatch =
      selectedTypes.length === 0 ||
      selectedTypes.some((selectedType) => {
        const jobTypes = Array.isArray(job.videoType)
          ? job.videoType
          : [job.videoType];
        return jobTypes.some(
          (type) => type.toLowerCase() === selectedType.toLowerCase()
        );
      });
    const platformMatch =
      selectedPlatforms.length === 0 ||
      selectedPlatforms.some(
        (selectedPlatform) =>
          job.publisher.platform.toLowerCase() ===
          selectedPlatform.toLowerCase()
      );

    console.log({
      job: job.title,
      platform: job.publisher.platform,
      selectedPlatforms,
      platformMatch,
    });

    return searchMatch && skillMatch && typeMatch && platformMatch;
  });

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container mx-auto px-4 max-w-5xl">
      <JobBanner />

      <div className="my-8 bg-[#25262b] p-6 rounded-lg border border-[#2c2d32]">
        <CategoryFilters
          selectedSkills={selectedSkills}
          selectedTypes={selectedTypes}
          selectedPlatforms={selectedPlatforms}
          onSkillChange={handleSkillChange}
          onTypeChange={handleTypeChange}
          onPlatformChange={handlePlatformChange}
        />
      </div>

      <JobList
        jobs={currentJobs}
        onJobClick={(jobId) => navigate(`/jobs/${jobId}`)}
      />

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
