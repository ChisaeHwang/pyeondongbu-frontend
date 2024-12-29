import React from "react";

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
  // 방송 플랫폼으로 변경
  const platforms = [
    { display: "YouTube", value: "youtube" },
    { display: "치지직", value: "chzzk" },
    { display: "Soop", value: "soop" },
  ];

  const videoTypes = [
    "게임",
    "브이로그",
    "음식",
    "일상",
    "교육",
    "인테리어",
    "음악",
    "스포츠",
    "뷰티",
  ];

  const skills = [
    "프리미어 프로",
    "애프터 이펙트",
    "파이널 컷",
    "베가스",
    "다빈치 리졸브",
    "캡컷",
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-gray-300 font-medium mb-2">방송 플랫폼</h3>
        <div className="flex flex-wrap gap-2">
          {platforms.map(({ display, value }) => (
            <button
              key={value}
              onClick={() => onPlatformChange(value)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                selectedPlatforms.includes(value)
                  ? "bg-blue-500 text-white"
                  : "bg-[#2c2d32] text-gray-300 hover:bg-[#3a3b40]"
              }`}
            >
              {display}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-gray-300 font-medium mb-2">영상 종류</h3>
        <div className="flex flex-wrap gap-2">
          {videoTypes.map((type) => (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
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
        <h3 className="text-gray-300 font-medium mb-2">편집 스킬</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <button
              key={skill}
              onClick={() => onSkillChange(skill)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
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
    </div>
  );
};

export default CategoryFilters;
