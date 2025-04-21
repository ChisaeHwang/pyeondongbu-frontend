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
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
    // IntersectionObserver를 사용하여 광고가 화면에 표시될 때만 로드
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const adContainer = document.getElementById("ad-container");
    if (adContainer) {
      observer.observe(adContainer);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // 로딩 시작 시간 기록
    const startTime = performance.now();

    try {
      // AdSense 코드 추가
      const adsbygoogle = window.adsbygoogle || [];
      adsbygoogle.push({
        callback: () => {
          // 로딩 완료 시간 측정
          const loadTime = performance.now() - startTime;
          console.log(`광고 로딩 시간: ${loadTime}ms`);
          setIsLoaded(true);
        },
      });
    } catch (e) {
      console.error("인피드 애드센스 광고 로드 중 오류:", e);
      setIsLoaded(true); // 오류 발생시에도 로딩 상태 변경
    }
  }, [isVisible, slot, isMobile]);

  // 모바일/데스크톱에 따른 슬롯 및 레이아웃 설정
  const adSlot = isMobile ? "7123368001" : "4688776358";
  const layoutKey = isMobile ? "-hk-1-x-dr+wr" : "-fu-3i+7j-dp+53";

  // 모바일과 데스크탑에 따른 높이 설정
  const minHeight = isMobile ? "250px" : "280px";

  return (
    <div
      id="ad-container"
      className={`bg-[#25262b] rounded-lg border border-[#2c2d32] overflow-hidden hover:border-[#3a3b40] transition-colors ${className}`}
      style={{ ...style, minHeight }}
    >
      <div className="p-4 h-full">
        {/* 광고 컨텐츠 */}
        <div
          className="w-full h-full relative"
          style={{ minHeight: isMobile ? "200px" : "230px" }}
        >
          {!isLoaded && isVisible && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse bg-[#2c2d32] w-full h-full rounded opacity-50"></div>
            </div>
          )}
          {isVisible && (
            <ins
              className="adsbygoogle"
              style={{
                display: "block",
                textAlign: "center",
                width: "100%",
                height: "100%",
                minHeight: isMobile ? "200px" : "230px",
              }}
              data-ad-format="fluid"
              data-ad-layout-key={layoutKey}
              data-ad-client="ca-pub-9895707756303015"
              data-ad-slot={adSlot}
              data-adtest={process.env.NODE_ENV !== "production" ? "on" : "off"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdInFeed;
