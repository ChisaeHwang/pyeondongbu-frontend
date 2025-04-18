import React, { useEffect } from "react";

interface AdBannerProps {
  width?: number;
  height?: number;
  slot?: string;
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({
  width = 300,
  height = 250,
  slot = "5409996939",
  className = "",
}) => {
  useEffect(() => {
    try {
      // AdSense 스크립트가 로드되어 있지 않은 경우 추가
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error("AdSense 광고 로드 중 오류:", error);
    }
  }, []);

  return (
    <div className={`ad-banner-container mx-auto bg-[#1a1b1f] ${className}`}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: `${width}px`,
          height: `${height}px`,
        }}
        data-ad-client="ca-pub-9895707756303015"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdBanner;
