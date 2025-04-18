import React from "react";
import AdBanner from "./AdBanner";

interface AdInFeedProps {
  slotId: string;
  className?: string;
}

// 게시글 목록 사이에 표시될 인피드 광고 컴포넌트
const AdInFeed: React.FC<AdInFeedProps> = ({ slotId, className = "" }) => {
  return (
    <div
      className={`my-4 rounded-lg overflow-hidden bg-[#2c2d32] ${className}`}
    >
      <AdBanner
        slot={slotId}
        format="rectangle"
        responsive={true}
        className="w-full min-h-[250px]"
      />
    </div>
  );
};

export default AdInFeed;
