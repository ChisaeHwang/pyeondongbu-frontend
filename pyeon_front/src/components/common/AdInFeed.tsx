import React from "react";
import AdBanner from "./AdBanner";

interface AdInFeedProps {
  mobileSlotId?: string;
  desktopSlotId?: string;
  className?: string;
}

// 게시글 목록 사이에 표시될 인피드 광고 컴포넌트
const AdInFeed: React.FC<AdInFeedProps> = ({
  mobileSlotId = "7123368001", // 모바일용 인피드 광고
  desktopSlotId = "4688776358", // 데스크탑용 인피드 광고
  className = "",
}) => {
  return (
    <div
      className={`my-4 rounded-lg overflow-hidden bg-[#2c2d32] ${className}`}
    >
      {/* 모바일 전용 광고 */}
      <div className="md:hidden">
        <AdBanner
          slot={mobileSlotId}
          format="auto"
          responsive={true}
          className="w-full min-h-[250px]"
          style={{
            display: "block",
          }}
        />
      </div>

      {/* 데스크탑 전용 광고 */}
      <div className="hidden md:block">
        <AdBanner
          slot={desktopSlotId}
          format="auto"
          responsive={true}
          className="w-full min-h-[250px]"
          style={{
            display: "block",
          }}
        />
      </div>
    </div>
  );
};

export default AdInFeed;
