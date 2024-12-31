import { useState, useCallback } from "react";
import { Job } from "../types/job";

interface UseJobFiltersProps {
  jobs: Job[];
  searchQuery: string;
}

export const useJobFilters = ({ jobs, searchQuery }: UseJobFiltersProps) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const removeHashAndSpace = (text: string) => text.replace(/^#\s*/, "");

  const handleSkillChange = useCallback((skill: string) => {
    const cleanSkill = removeHashAndSpace(skill);
    setSelectedSkills((prev) =>
      prev.includes(cleanSkill)
        ? prev.filter((s) => s !== cleanSkill)
        : [...prev, cleanSkill]
    );
    setCurrentPage(1);
  }, []);

  const handleTypeChange = useCallback((type: string) => {
    const cleanType = removeHashAndSpace(type);
    setSelectedTypes((prev) =>
      prev.includes(cleanType)
        ? prev.filter((t) => t !== cleanType)
        : [...prev, cleanType]
    );
    setCurrentPage(1);
  }, []);

  const handlePlatformChange = useCallback((platform: string) => {
    const cleanPlatform = removeHashAndSpace(platform);
    setSelectedPlatforms((prev) =>
      prev.includes(cleanPlatform)
        ? prev.filter((p) => p !== cleanPlatform)
        : [...prev, cleanPlatform]
    );
    setCurrentPage(1);
  }, []);

  const filteredJobs = jobs.filter((job: Job) => {
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

    return searchMatch && skillMatch && typeMatch && platformMatch;
  });

  return {
    selectedSkills,
    selectedTypes,
    selectedPlatforms,
    currentPage,
    setCurrentPage,
    handleSkillChange,
    handleTypeChange,
    handlePlatformChange,
    filteredJobs,
  };
};
