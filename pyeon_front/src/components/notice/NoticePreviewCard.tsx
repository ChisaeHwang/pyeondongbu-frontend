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
      className="bg-[#25262b] rounded-lg p-6 cursor-pointer border border-[#2c2d32] hover:border-[#3a3b40] transition-colors"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-blue-400 font-semibold">공지사항</span>
        {notice.important && (
          <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-sm">
            중요
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold text-gray-100 mb-1">{notice.title}</h3>
      <p className="text-sm text-gray-400">
        {new Date(notice.publishedAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default NoticePreviewCard;
