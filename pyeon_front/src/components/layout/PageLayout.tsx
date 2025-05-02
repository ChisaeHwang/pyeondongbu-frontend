import React from "react";
import AdBanner from "../ads/AdBanner";

interface PageLayoutProps {
  children: React.ReactNode;
}

/**
 * 모든 페이지에 적용될 공통 레이아웃 컴포넌트
 * 데스크탑에서는 양쪽에 사이드바 광고를 표시하고, 모바일에서는 메인 콘텐츠만 표시합니다.
 */
const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-center">
        {/* 왼쪽 사이드바 (데스크탑에서만 표시) */}
        <div className="hidden md:block flex-none md:w-[160px] lg:w-[180px] mt-8">
          <div className="sticky top-24">
            <AdBanner position="sidebar" />
          </div>
        </div>

        {/* 메인 콘텐츠 - 원래 비율 유지 */}
        <div className="w-full md:max-w-5xl px-0 md:px-4">{children}</div>

        {/* 오른쪽 사이드바 (데스크탑에서만 표시) */}
        <div className="hidden md:block flex-none md:w-[160px] lg:w-[180px] mt-8">
          <div className="sticky top-24">
            <AdBanner position="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
