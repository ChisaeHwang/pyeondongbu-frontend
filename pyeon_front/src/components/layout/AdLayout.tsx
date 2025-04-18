import React, { ReactNode } from "react";
import AdSidebar from "../common/AdSidebar";

interface AdLayoutProps {
  children: ReactNode;
  leftSlotId?: string;
  rightSlotId?: string;
  showLeftAd?: boolean;
  showRightAd?: boolean;
}

/**
 * 광고를 포함한 레이아웃 컴포넌트
 * - 모바일에서는 전체 너비를 사용
 * - 데스크톱에서는 좌우에 광고가 표시됨
 */
const AdLayout: React.FC<AdLayoutProps> = ({
  children,
  leftSlotId = "4880348045", // 왼쪽 사이드바 슬롯 ID
  rightSlotId = "9941103036", // 오른쪽 사이드바 슬롯 ID
  showLeftAd = true,
  showRightAd = true,
}) => {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 flex bg-[#1a1b1e]">
      {/* 왼쪽 사이드바 광고 */}
      {showLeftAd && <AdSidebar slotId={leftSlotId} className="w-[160px]" />}

      {/* 메인 콘텐츠 */}
      <div className="flex-1 w-full max-w-5xl mx-auto">{children}</div>

      {/* 오른쪽 사이드바 광고 */}
      {showRightAd && <AdSidebar slotId={rightSlotId} className="w-[160px]" />}
    </div>
  );
};

export default AdLayout;
