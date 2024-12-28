import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import jobsData from "../assets/data/jobs.json";
import CategoryFilters from "../components/jobs/CategoryFilters";

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 7) {
      return formatDistanceToNow(date, { addSuffix: true, locale: ko });
    }
    return format(date, "M월 d일", { locale: ko });
  };

  const filteredJobs = jobsData.jobs.filter((job) => {
    const searchMatch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase());
    const skillMatch =
      selectedSkills.length === 0 ||
      (job.skills &&
        job.skills.some((skill) => selectedSkills.includes(skill)));
    const typeMatch =
      selectedTypes.length === 0 ||
      (job.videoType && selectedTypes.includes(job.videoType));
    const platformMatch =
      selectedPlatforms.length === 0 ||
      selectedPlatforms.some(
        (platform) =>
          job.platform.toLowerCase() === platform.toLowerCase() ||
          job.publisher.platform.toLowerCase() === platform.toLowerCase()
      );

    return searchMatch && skillMatch && typeMatch && platformMatch;
  });

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <div className="container mx-auto px-4 max-w-5xl">
        {/* 배너 */}
        <div className="mb-6 mt-6">
          <div className="bg-[#25262b] rounded-lg p-6">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-300 mb-2">
                  유명 유튜버의 작업자 모집,
                </h1>
                <h1 className="text-3xl font-bold text-gray-300 mb-3 pl-24">
                  한 번에 확인하는 방법
                </h1>
                <p className="text-gray-300">
                  필요한 정보를 쉽고 빠르게 찾아보세요
                </p>
              </div>
              <div className="flex-1 flex justify-end">
                <div className="w-[100%] h-[200px] rounded-lg overflow-hidden">
                  <img
                    src="https://ifh.cc/g/mr3J95.jpg"
                    alt="배너 이미지"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 필터 영역 */}
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

        {/* 구인글 목록 */}
        <div className="space-y-4">
          {currentJobs.map((job, index) => (
            <div
              key={job.id}
              onClick={() => navigate(`/jobs/${job.id}`)}
              className="bg-[#25262b] p-6 rounded-lg cursor-pointer hover:bg-[#2c2d32] transition-all border border-[#2c2d32] opacity-0 animate-fade-in shadow-sm hover:shadow-md"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "forwards",
              }}
            >
              <div className="flex gap-6 sm:gap-5">
                {/* 프로필 이미지 */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-700 border border-gray-600">
                    {job.publisher.image ? (
                      <img
                        src={job.publisher.image}
                        alt={job.publisher.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl">
                        {job.publisher.name[0]}
                      </div>
                    )}
                  </div>
                </div>

                {/* 컨텐츠 */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col h-full">
                    <div className="mb-auto">
                      <h2 className="text-xl font-bold text-gray-100 mb-3 line-clamp-1">
                        {job.title}
                      </h2>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.videoType && (
                          <span className="inline-block bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-500/30">
                            {job.videoType}
                          </span>
                        )}
                        {job.skills?.map((skill) => (
                          <span
                            key={skill}
                            className="inline-block bg-[#3a3b40] text-gray-300 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 하단 정보 */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400 font-medium">
                        {job.publisher.name}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500">
                          {formatDate(job.publishedAt)}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-xs ${
                            job.platform === "youtube"
                              ? "bg-red-500/20 text-red-300 border border-red-500/30"
                              : job.platform === "x"
                              ? "bg-[#2c2d32] text-white border border-[#404040]"
                              : "bg-green-500/20 text-green-300 border border-green-500/30"
                          }`}
                        >
                          {job.platform === "youtube"
                            ? "YouTube"
                            : job.platform === "x"
                            ? "X"
                            : "카페"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        {filteredJobs.length > 0 && (
          <div className="flex justify-center gap-2 my-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 1
                  ? "bg-[#2c2d32] text-gray-500 cursor-not-allowed"
                  : "bg-[#25262b] text-gray-300 hover:bg-[#2c2d32] border border-[#2c2d32]"
              }`}
            >
              이전
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                return (
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(currentPage - page) <= 2
                );
              })
              .map((page, index, array) => {
                if (index > 0 && page - array[index - 1] > 1) {
                  return (
                    <span
                      key={`ellipsis-${page}`}
                      className="px-4 py-2 text-gray-500"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-[#25262b] text-gray-300 hover:bg-[#2c2d32] border border-[#2c2d32]"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === totalPages
                  ? "bg-[#2c2d32] text-gray-500 cursor-not-allowed"
                  : "bg-[#25262b] text-gray-300 hover:bg-[#2c2d32] border border-[#2c2d32]"
              }`}
            >
              다음
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default JobListPage;
