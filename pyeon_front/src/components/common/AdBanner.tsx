import React, { useEffect } from "react";

interface AdBannerProps {
  className?: string;
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  style?: React.CSSProperties;
}

const AdBanner: React.FC<AdBannerProps> = ({
  className = "",
  slot,
  format = "auto",
  responsive = true,
  style = {},
}) => {
  useEffect(() => {
    try {
      // AdSense 코드 추가
      const adsbygoogle = window.adsbygoogle || [];
      adsbygoogle.push({});
    } catch (e) {
      console.error("애드센스 광고 로드 중 오류:", e);
    }
  }, [slot]);

  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client="ca-pub-9895707756303015" // index.html에서 확인된 클라이언트 ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
};

export default AdBanner;
