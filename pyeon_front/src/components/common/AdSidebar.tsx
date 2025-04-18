import React from "react";
import AdBanner from "./AdBanner";

interface AdSidebarProps {
  className?: string;
}

const AdSidebar: React.FC<AdSidebarProps> = ({ className = "" }) => {
  return (
    <div className={`ad-sidebar ${className}`}>
      <AdBanner
        adClient="ca-pub-9895707756303015"
        adSlot="5409996939"
        width={300}
        height={600}
        format="vertical"
        responsive={false}
        className="mb-4"
      />
    </div>
  );
};

export default AdSidebar;
