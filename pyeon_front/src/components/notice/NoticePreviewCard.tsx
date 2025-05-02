import React from "react";
import { useNavigate } from "react-router-dom";
import { Notice } from "../../types/notice";

interface NoticePreviewCardProps {
  notice: Notice;
}

const NoticePreviewCard: React.FC<NoticePreviewCardProps> = ({ notice }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/notices/${notice.id}`)}
      className="bg-[#25262b] rounded-lg p-4 cursor-pointer border border-[#2c2d32] hover:border-[#3a3b40] transition-colors h-[140px] flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-blue-400 font-semibold text-sm">공지사항</span>
          {notice.important && (
            <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-xs">
              중요
            </span>
          )}
        </div>
        <h3 className="text-base font-bold text-gray-100 mb-1 line-clamp-2">
          {notice.title}
        </h3>
      </div>
      <p className="text-xs text-gray-400 mt-2">
        {new Date(notice.publishedAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default NoticePreviewCard;
