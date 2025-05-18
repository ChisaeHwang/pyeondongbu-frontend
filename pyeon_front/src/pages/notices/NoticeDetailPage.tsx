import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import noticesData from "../../assets/data/notices.json";
import AdBanner from "../../components/ads/AdBanner";

const NoticeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const notice = noticesData.notices.find((n) => n.id === Number(id));

  if (!notice) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto text-center text-gray-400 py-12">
          존재하지 않는 공지사항입니다.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-5xl mt-8">
      <button
        onClick={() => navigate("/notices")}
        className="text-gray-400 hover:text-gray-300 mb-6 flex items-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        목록으로 돌아가기
      </button>

      <div className="bg-[#25262b] rounded-lg p-6 border border-[#2c2d32]">
        <div className="flex items-center gap-2 mb-4">
          {notice.important && (
            <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-sm">
              중요
            </span>
          )}
          <h1 className="text-2xl font-bold text-gray-100">{notice.title}</h1>
        </div>

        <div className="text-sm text-gray-400 mb-6">
          {new Date(notice.publishedAt).toLocaleDateString()}
        </div>

        <div
          className="prose prose-invert max-w-none text-gray-100"
          dangerouslySetInnerHTML={{ __html: notice.content }}
        />
      </div>

      {/* 하단 배너 광고 */}
      <div className="mt-10">
        <AdBanner position="content-bottom" />
      </div>
    </div>
  );
};

export default NoticeDetailPage;
