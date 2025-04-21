import React, { useEffect, useState, useRef } from "react";

interface AdInFeedProps {
  className?: string;
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical" | "fluid";
  responsive?: boolean;
  style?: React.CSSProperties;
  id?: string;
}

const AdInFeed: React.FC<AdInFeedProps> = ({
  className = "",
  slot,
  format = "fluid",
  responsive = true,
  style = {},
  id = `ad-${Math.random().toString(36).substring(2, 10)}`,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const adLoaded = useRef(false);
  const adElementRef = useRef<HTMLDivElement>(null);

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
    // 이미 로드됐으면 중복 로드 방지
    if (adLoaded.current) return;

    // 브라우저가 아니면 실행하지 않음
    if (typeof window === "undefined") return;

    try {
      // 광고가 로드될 때까지 약간 대기
      const timer = setTimeout(() => {
        if (!window.adsbygoogle) {
          console.warn("애드센스가 초기화되지 않았습니다.");
          return;
        }

        // 해당 광고 요소에 data-ad-status 속성이 있는지 확인
        const adElement =
          adElementRef.current?.querySelector("ins.adsbygoogle");
        if (adElement && !adElement.getAttribute("data-ad-status")) {
          // 광고가 아직 로드되지 않은 경우에만 로드 시도
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            adLoaded.current = true;
            console.log(
              "애드센스 광고 로드 시도:",
              isMobile ? "모바일" : "데스크탑",
              "슬롯:",
              isMobile ? "7123368001" : "4688776358",
              "ID:",
              id
            );
          } catch (pushError) {
            console.error("광고 푸시 중 오류:", pushError);
          }
        } else {
          console.log("이미 광고가 로드된 요소입니다:", id);
        }
      }, 500);

      // 컴포넌트 언마운트 시 타이머 정리
      return () => clearTimeout(timer);
    } catch (e) {
      console.error("인피드 애드센스 광고 로드 중 오류:", e);
    }
  }, [isMobile, id]);

  // 모바일/데스크톱에 따른 슬롯 및 레이아웃 설정
  const adSlot = isMobile ? "7123368001" : "4688776358";
  const layoutKey = isMobile ? "-hk-1-x-dr+wr" : "-fu-3i+7j-dp+53";

  return (
    <div
      ref={adElementRef}
      className={`bg-[#25262b] rounded-lg border border-[#2c2d32] overflow-hidden hover:border-[#3a3b40] transition-colors ${className}`}
      style={style}
      id={id}
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
