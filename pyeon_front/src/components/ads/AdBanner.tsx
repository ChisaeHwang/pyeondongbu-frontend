import React, { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdBannerProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 구글 애드센스 광고 컴포넌트 (인라인 HTML 방식)
 */
const AdBanner: React.FC<AdBannerProps> = ({ className = "", style = {} }) => {
  useEffect(() => {
    try {
      // 광고 삽입
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("AdSense 오류:", error);
    }
  }, []);

  return (
    <div
      className={`ad-container ${className}`}
      style={{ textAlign: "center", ...style }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: "inline-block",
          width: "300px",
          height: "250px",
          margin: "0 auto",
        }}
        data-ad-client="ca-pub-9895707756303015"
        data-ad-slot="5409996939"
      />
    </div>
  );
};

export default AdBanner;
