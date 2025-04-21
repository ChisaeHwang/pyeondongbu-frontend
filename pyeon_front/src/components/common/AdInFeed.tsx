import React, { useEffect, useState } from "react";

interface AdInFeedProps {
  className?: string;
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical" | "fluid";
  responsive?: boolean;
  style?: React.CSSProperties;
}

const AdInFeed: React.FC<AdInFeedProps> = ({
  className = "",
  slot,
  format = "fluid",
  responsive = true,
  style = {},
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 모바일 여부 확인
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 초기 확인
    checkIsMobile();

    // 화면 크기 변경 시 다시 확인
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  useEffect(() => {
    try {
      // AdSense 코드 추가
      const adsbygoogle = window.adsbygoogle || [];
      adsbygoogle.push({});
    } catch (e) {
      console.error("인피드 애드센스 광고 로드 중 오류:", e);
    }
  }, [slot, isMobile]);

  // 모바일/데스크톱에 따른 슬롯 및 레이아웃 설정
  const adSlot = isMobile ? "7123368001" : "4688776358";
  const layoutKey = isMobile ? "-hk-1-x-dr+wr" : "-fu-3i+7j-dp+53";

  return (
    <div
      className={`bg-[#25262b] rounded-lg border border-[#2c2d32] overflow-hidden hover:border-[#3a3b40] transition-colors ${className}`}
      style={style}
    >
      {/* 패딩 제거하여 광고가 카드 전체를 채우도록 함 */}
      <div className="w-full h-full">
        {/* 광고 컨텐츠 */}
        <div className="flex flex-col h-full">
          {/* 광고 라벨 추가 */}
          <div className="flex justify-between items-center mb-3"></div>

          {/* 실제 광고 내용 */}
          <div className="w-full min-h-[120px] md:min-h-[160px]">
            <ins
              className="adsbygoogle"
              style={{
                display: "block",
                textAlign: "center",
                width: "100%",
                height: "100%",
                minHeight: "120px",
              }}
              data-ad-format="fluid"
              data-ad-layout-key={layoutKey}
              data-ad-client="ca-pub-9895707756303015"
              data-ad-slot={adSlot}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdInFeed;
