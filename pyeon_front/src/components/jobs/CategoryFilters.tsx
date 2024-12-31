import React from "react";
import { SKILLS, VIDEO_TYPES, PLATFORMS } from "../../constants/filters";

interface CategoryFiltersProps {
  selectedSkills: string[];
  selectedTypes: string[];
  selectedPlatforms: string[];
  onSkillChange: (skill: string) => void;
  onTypeChange: (type: string) => void;
  onPlatformChange: (platform: string) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  selectedSkills,
  selectedTypes,
  selectedPlatforms,
  onSkillChange,
  onTypeChange,
  onPlatformChange,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-gray-400 text-sm mb-2">편집 툴</h3>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <button
              key={skill}
              onClick={() => onSkillChange(skill)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                selectedSkills.includes(skill)
                  ? "bg-blue-500 text-white"
                  : "bg-[#2c2d32] text-gray-300 hover:bg-[#3a3b40]"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-gray-400 text-sm mb-2">영상 종류</h3>
        <div className="flex flex-wrap gap-2">
          {VIDEO_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                selectedTypes.includes(type)
                  ? "bg-blue-500 text-white"
                  : "bg-[#2c2d32] text-gray-300 hover:bg-[#3a3b40]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-gray-400 text-sm mb-2">플랫폼</h3>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((platform) => (
            <button
              key={platform}
              onClick={() => onPlatformChange(platform)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                selectedPlatforms.includes(platform)
                  ? "bg-blue-500 text-white"
                  : "bg-[#2c2d32] text-gray-300 hover:bg-[#3a3b40]"
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
