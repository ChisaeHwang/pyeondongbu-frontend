import React, { useState } from "react";
import { SKILLS, VIDEO_TYPES, PLATFORMS } from "../../constants/filters";
import SearchInput from "../common/SearchInput";

interface CategoryFiltersProps {
  selectedSkills: string[];
  selectedTypes: string[];
  selectedPlatforms: string[];
  searchQuery: string;
  onSearch: (query: string) => void;
  onSkillChange: (skill: string) => void;
  onTypeChange: (type: string) => void;
  onPlatformChange: (platform: string) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  selectedSkills,
  selectedTypes,
  selectedPlatforms,
  searchQuery,
  onSearch,
  onSkillChange,
  onTypeChange,
  onPlatformChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleSubmit = () => {
    onSearch(searchTerm.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-6">
      <div className="w-full max-w-full">
        <SearchInput
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          onSubmit={handleSubmit}
          placeholder="구인글 검색..."
        />
      </div>

      <div>
        <h3 className="text-gray-400 text-sm mb-3">편집 툴</h3>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <button
              key={skill}
              onClick={() => onSkillChange(skill)}
              className={`px-4 py-2 text-sm rounded-md transition-colors min-h-[40px] active:translate-y-[1px] ${
                selectedSkills.includes(skill)
                  ? "bg-cyan-500 text-white"
                  : "bg-[#1a1b1e] text-cyan-300/90 md:hover:bg-[#2b2b2b]"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-gray-400 text-sm mb-3">영상 종류</h3>
        <div className="flex flex-wrap gap-2">
          {VIDEO_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`px-4 py-2 text-sm rounded-md transition-colors min-h-[40px] active:translate-y-[1px] ${
                selectedTypes.includes(type)
                  ? "bg-fuchsia-500 text-white"
                  : "bg-[#1a1b1e] text-fuchsia-300/90 md:hover:bg-[#2b2b2b]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-gray-400 text-sm mb-3">플랫폼</h3>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((platform) => (
            <button
              key={platform}
              onClick={() => onPlatformChange(platform)}
              className={`px-4 py-2 text-sm rounded-md transition-colors min-h-[40px] active:translate-y-[1px] ${
                selectedPlatforms.includes(platform)
                  ? "bg-emerald-500 text-white"
                  : "bg-[#1a1b1e] text-emerald-300/90 md:hover:bg-[#2b2b2b]"
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilters;
