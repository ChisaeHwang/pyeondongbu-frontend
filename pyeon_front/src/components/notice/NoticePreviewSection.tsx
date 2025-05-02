/**
 * @description 메인 페이지에 표시되는 공지사항 미리보기 섹션
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import noticesData from "../../assets/data/notices.json";
import NoticePreviewCard from "./NoticePreviewCard";

const NoticePreviewSection: React.FC = () => {
  const navigate = useNavigate();
  const notices = noticesData.notices
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 4); // 최근 4개만 표시

  if (notices.length === 0) {
    return null; // 공지사항이 없으면 섹션 자체를 숨김
  }

  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-100">공지사항</h2>
        <button
          onClick={() => navigate("/notices")}
          className="text-blue-400 hover:text-blue-300 text-sm"
        >
          더보기
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {notices.map((notice, index) => (
          <div
            key={notice.id}
            className={`${index >= 2 && index < 4 ? "hidden sm:block" : ""} ${
              index >= 4 ? "hidden lg:block" : ""
            }`}
          >
            <NoticePreviewCard notice={notice} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticePreviewSection;
