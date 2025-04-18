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
  leftSlotId = "1234567890", // 실제 슬롯 ID로 변경 필요
  rightSlotId = "0987654321", // 실제 슬롯 ID로 변경 필요
  showLeftAd = true,
  showRightAd = true,
}) => {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 flex bg-[#1a1b1e]">
      {/* 왼쪽 사이드바 광고 */}
      {showLeftAd && (
        <AdSidebar slotId={leftSlotId} className="w-[160px] mr-4" />
      )}

      {/* 메인 콘텐츠 */}
      <div className="flex-1 w-full max-w-5xl mx-auto">{children}</div>

      {/* 오른쪽 사이드바 광고 */}
      {showRightAd && (
        <AdSidebar slotId={rightSlotId} className="w-[160px] ml-4" />
      )}
    </div>
  );
};

export default AdLayout;
