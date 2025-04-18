import React from "react";
import AdBanner from "./AdBanner";

interface AdSidebarProps {
  slotId: string;
  className?: string;
  sticky?: boolean;
}

// 사이드바에 표시될 광고 컴포넌트
const AdSidebar: React.FC<AdSidebarProps> = ({
  slotId,
  className = "",
  sticky = true,
}) => {
  return (
    <div
      className={`
        hidden lg:block
        ${sticky ? "sticky top-20" : ""}
        ${className}
      `}
    >
      <AdBanner
        slot={slotId}
        format="vertical"
        responsive={true}
        className="w-full min-h-[600px]"
      />
    </div>
  );
};

export default AdSidebar;
