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
      // 에러 발생시 조용히 실패
    }
  }, [slot]);

  // 컨테이너 스타일 계산 - 원래 광고 크기인 300x250에 맞게 조정
  const containerStyle: React.CSSProperties = {
    width: "300px",
    height: "250px",
    margin: "0 auto",
    position: "relative",
    overflow: "hidden",
    ...style,
  };

  return (
    <div className={`ad-container ${className}`} style={containerStyle}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "300px",
          height: "250px",
          textAlign: "center",
        }}
        data-ad-client="ca-pub-9895707756303015"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
};

export default AdBanner;
