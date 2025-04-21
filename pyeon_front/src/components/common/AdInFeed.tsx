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

          // 광고가 로드된 후 스타일 적용
          setTimeout(() => {
            try {
              // 광고 iframe을 찾아서 배경색 수정
              const adContainer = document.getElementById("ad-container");
              if (adContainer) {
                const iframes = adContainer.querySelectorAll("iframe");
                iframes.forEach((iframe) => {
                  try {
                    // @ts-ignore - iframe.contentDocument는 보안 정책으로 접근이 제한될 수 있음
                    const doc = iframe.contentDocument;
                    if (doc) {
                      const style = document.createElement("style");
                      style.textContent = `body { background-color: #25262b !important; }`;
                      doc.head.appendChild(style);
                    }
                  } catch (e) {
                    // 크로스 오리진 정책으로 접근 제한 가능성
                    console.log("iframe 접근 오류");
                  }
                });
              }
            } catch (error) {
              console.error("광고 iframe 스타일 적용 오류:", error);
            }
          }, 200);
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

  // 광고 로드 후 CSS 인젝션을 위한 스타일
  useEffect(() => {
    if (isLoaded) {
      const injectStyles = () => {
        try {
          // 모든 adsbygoogle 관련 iframe을 찾아서 배경색 설정
          const iframes = document.querySelectorAll("iframe[id^='aswift_']");
          iframes.forEach((iframe) => {
            try {
              // @ts-ignore - iframe.contentDocument는 보안 정책으로 접근이 제한될 수 있음
              const doc = iframe.contentDocument;
              if (doc) {
                const style = document.createElement("style");
                style.textContent = `
                  body { background-color: #25262b !important; }
                  .adsbygoogle { background-color: #25262b !important; }
                `;
                doc.head.appendChild(style);
              }
            } catch (e) {
              // 크로스 오리진 정책으로 접근 불가능할 수 있음
              console.log("iframe 스타일 적용 실패");
            }
          });
        } catch (e) {
          console.error("광고 스타일 적용 오류:", e);
        }
      };

      // 약간의 지연 후 스타일 적용 시도
      setTimeout(injectStyles, 500);
    }
  }, [isLoaded]);

  return (
    <div
      id="ad-container"
      className={`bg-[#25262b] rounded-lg border border-[#2c2d32] overflow-hidden hover:border-[#3a3b40] transition-colors cursor-pointer h-full ${className}`}
      style={style}
    >
      <div className="p-4 h-full flex flex-col">
        {/* 광고 컨텐츠 */}
        <div className="w-full h-full flex-1 relative bg-[#25262b]">
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
                height: "100%",
                width: "100%",
                backgroundColor: "#25262b",
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
