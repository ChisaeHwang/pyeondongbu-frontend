import React from "react";
import AdBanner from "./AdBanner";

interface AdContainerProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 애드센스 광고를 표시하는 컨테이너 컴포넌트
 * 모든 페이지에서 항상 300x250 중간 광고를 표시합니다.
 *
 * @param className - 추가 CSS 클래스 (선택)
 * @param style - 추가 인라인 스타일 (선택)
 */
const AdContainer: React.FC<AdContainerProps> = ({
  className = "",
  style = {},
}) => {
  return (
    <div
      className={`ad-wrapper ${className}`}
      style={{
        overflow: "hidden",
        margin: "24px auto",
        position: "relative",
        ...style,
      }}
      data-ad-layout="rectangle"
    >
      <AdBanner />
    </div>
  );
};

export default AdContainer;
