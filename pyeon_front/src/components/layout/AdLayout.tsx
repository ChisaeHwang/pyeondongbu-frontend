import React, { ReactNode } from "react";
import AdSidebar from "../common/AdSidebar";

interface AdLayoutProps {
  children: ReactNode;
  showAd?: boolean;
  className?: string;
}

/**
 * 광고를 포함한 레이아웃 컴포넌트
 * - 모바일에서는 전체 너비를 사용
 * - 데스크톱에서는 오른쪽에 광고가 표시됨
 */
const AdLayout: React.FC<AdLayoutProps> = ({
  children,
  showAd = true,
  className = "",
}) => {
  return (
    <div className={`container mx-auto max-w-7xl px-4 py-8 flex ${className}`}>
      {/* 메인 콘텐츠 */}
      <div className="flex-1 w-full max-w-5xl mx-auto">{children}</div>

      {/* 오른쪽 사이드바 광고 */}
      {showAd && (
        <div className="hidden lg:block ml-4">
          <AdSidebar className="sticky top-20" />
        </div>
      )}
    </div>
  );
};

export default AdLayout;
