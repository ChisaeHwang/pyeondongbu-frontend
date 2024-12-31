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
                  ? "bg-cyan-500 text-white"
                  : "bg-[#1a1b1e] text-cyan-300/90 hover:bg-[#2b2b2b]"
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
                  ? "bg-fuchsia-500 text-white"
                  : "bg-[#1a1b1e] text-fuchsia-300/90 hover:bg-[#2b2b2b]"
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
                  ? "bg-emerald-500 text-white"
                  : "bg-[#1a1b1e] text-emerald-300/90 hover:bg-[#2b2b2b]"
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
