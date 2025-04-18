import React, { useEffect, useRef } from "react";

interface AdBannerProps {
  adClient: string;
  adSlot: string;
  width?: number;
  height?: number;
  format?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
  responsive?: boolean;
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({
  adClient,
  adSlot,
  width = 300,
  height = 250,
  format = "rectangle",
  responsive = false,
  className = "",
}) => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 광고 로드
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("광고 로드 중 오류가 발생했습니다:", e);
    }
  }, []);

  if (responsive) {
    // 반응형 광고
    return (
      <div ref={adContainerRef} className={`ad-container ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format={format}
          data-full-width-responsive="true"
        ></ins>
      </div>
    );
  }

  // 고정 크기 광고
  return (
    <div ref={adContainerRef} className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{
          display: "inline-block",
          width: `${width}px`,
          height: `${height}px`,
        }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
      ></ins>
    </div>
  );
};

export default AdBanner;
