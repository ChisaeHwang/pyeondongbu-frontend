import React, { ReactNode } from "react";

interface AdLayoutProps {
  children: ReactNode;
}

/**
 * 광고 레이아웃 컴포넌트 (간소화됨)
 * 하위 호환성을 위해 유지됨
 */
const AdLayout: React.FC<AdLayoutProps> = ({ children }) => {
  return <div className="ad-layout-container">{children}</div>;
};

export default AdLayout;
