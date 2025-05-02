import React from "react";
import AdBanner from "./AdBanner";

interface AdContainerProps {
  className?: string;
  style?: React.CSSProperties;
  position?:
    | "content-top"
    | "content-middle"
    | "content-bottom"
    | "sidebar"
    | "inline";
}

/**
 * 애드센스 광고를 표시하는 컨테이너 컴포넌트
 * 모든 페이지에서 반응형 광고를 표시합니다.
 * 절대 실패하지 않고 광고를 로드하도록 최적화됨
 */
const AdContainer: React.FC<AdContainerProps> = ({
  className = "",
  style = {},
  position = "content-top",
}) => {
  return (
    <div
      className={`ad-wrapper ${className}`}
      style={{
        overflow: "hidden",
        margin: "40px auto",
        padding: "10px 0",
        position: "relative",
        width: "100%",
        textAlign: "center",
        ...style,
      }}
      data-ad-layout="rectangle"
    >
      <div style={{ width: "100%", margin: "0 auto" }}>
        <AdBanner position={position} />
      </div>
    </div>
  );
};

export default AdContainer;
