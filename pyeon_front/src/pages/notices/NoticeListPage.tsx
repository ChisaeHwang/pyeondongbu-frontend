import React from "react";
import { useNavigate } from "react-router-dom";
import noticesData from "../../assets/data/notices.json";

const NoticeListPage: React.FC = () => {
  const navigate = useNavigate();
  const notices = noticesData.notices.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="container mx-auto px-4 max-w-5xl mt-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-100 mb-6">공지사항</h1>
        <div className="space-y-4">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <div
                key={notice.id}
                onClick={() => navigate(`/notices/${notice.id}`)}
                className="bg-[#25262b] rounded-lg p-6 cursor-pointer border border-[#2c2d32] hover:border-[#3a3b40] transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {notice.important && (
                      <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-sm">
                        중요
                      </span>
                    )}
                    <h2 className="text-lg font-bold text-gray-100">
                      {notice.title}
                    </h2>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(notice.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-12">
              등록된 공지사항이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeListPage;
