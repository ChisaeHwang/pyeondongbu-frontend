import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";

interface AdInFeedProps {
  className?: string;
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical" | "fluid";
  responsive?: boolean;
  style?: React.CSSProperties;
  id?: string;
  adPosition?: "first" | "second"; // 어떤 위치의 광고를 표시할지 지정
}

const AdInFeed: React.FC<AdInFeedProps> = ({
  className = "",
  slot,
  format = "auto",
  responsive = true,
  style = {},
  id = `ad-${Math.random().toString(36).substring(2, 10)}`,
  adPosition,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const adLoaded = useRef<boolean[]>([false, false]);
  const adElementRef = useRef<HTMLDivElement>(null);
  const attemptCount = useRef<number>(0);

  // 디버깅 정보 - 개발환경에서만 사용
  const debugInfo = useMemo(
    () => ({
      id,
      adPosition,
      isMobileView: isMobile,
    }),
    [id, adPosition, isMobile]
  );

  useEffect(() => {
    // 모바일 여부 확인
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 초기 확인
    checkIsMobile();

    // 화면 크기 변경 시 다시 확인
    window.addEventListener("resize", checkIsMobile);
    window.addEventListener("orientationchange", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
      window.removeEventListener("orientationchange", checkIsMobile);
    };
  }, []);

  // 광고 슬롯 정의 - 사용할 두 개의 슬롯만 남김
  const adSlots = useMemo(() => ["8992096836", "1849233282"], []);

  // adPosition 속성에 따라 슬롯 선택 - useCallback으로 감싸서 메모이제이션
  const getSlotForPosition = useCallback(
    (position: number): string => {
      // 명시적으로 지정된 adPosition이 있을 경우 우선 적용
      if (adPosition === "first") return adSlots[0];
      if (adPosition === "second") return adSlots[1];

      // adPosition이 지정되지 않았으면 인덱스에 따라 결정
      return adSlots[position % adSlots.length];
    },
    [adPosition, adSlots]
  );

  useEffect(() => {
    // 브라우저가 아니면 실행하지 않음
    if (typeof window === "undefined") return;

    const loadAd = (index: number, adElement: Element) => {
      // 이미 로드됐으면 중복 로드 방지
      if (adLoaded.current[index]) return;

      // 재시도 시간에 약간의 랜덤성 추가 (광고 로드 충돌 방지)
      const delay = 500 + Math.random() * 300;

      // 광고가 로드될 때까지 약간 대기
      setTimeout(() => {
        if (!window.adsbygoogle) {
          return;
        }

        const adstatus = adElement.getAttribute("data-ad-status");
        if (!adstatus || adstatus !== "filled") {
          // 광고가 아직 로드되지 않은 경우에만 로드 시도
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            adLoaded.current[index] = true;
            attemptCount.current++;

            // 상태 확인을 위한 MutationObserver 설정
            const observer = new MutationObserver((mutations) => {
              mutations.forEach((mutation) => {
                if (
                  mutation.type === "attributes" &&
                  mutation.attributeName === "data-ad-status"
                ) {
                  const status = adElement.getAttribute("data-ad-status");

                  if (status === "filled") {
                    observer.disconnect();
                  }
                }
              });
            });

            observer.observe(adElement, { attributes: true });

            // 60초 후 자동 해제
            setTimeout(() => observer.disconnect(), 60000);
          } catch (pushError) {
            console.error("광고 로드 중 오류 발생");
          }
        }
      }, delay);
    };

    try {
      // 모든 광고 요소 찾기
      const adElements =
        adElementRef.current?.querySelectorAll("ins.adsbygoogle");
      if (!adElements || adElements.length === 0) {
        return;
      }

      // 첫 번째 광고 항상 로드
      loadAd(0, adElements[0]);

      // 데스크탑에서는 두 번째 광고도 로드
      if (!isMobile && adElements.length > 1) {
        loadAd(1, adElements[1]);
      }
    } catch (e) {
      console.error("광고 로드 중 오류 발생");
    }
  }, [isMobile, id, getSlotForPosition, debugInfo]);

  // 정확한 광고 크기(300x250)에 맞춘 컨테이너 스타일
  const adContainerStyle: React.CSSProperties = {
    position: "relative",
    width: "300px",
    height: "250px",
    overflow: "hidden",
    margin: "0 auto",
    ...style,
  };

  return (
    <div
      ref={adElementRef}
      className={`${className} w-full flex justify-center`}
      id={id}
      data-ad-position={adPosition || "default"}
    >
      <div
        className={`w-full flex ${
          isMobile ? "justify-center px-0" : "justify-center gap-4"
        } max-w-[650px]`}
      >
        {/* 첫 번째 광고 - 항상 표시 */}
        <div style={adContainerStyle} className="mx-auto">
          <ins
            className="adsbygoogle"
            style={{
              display: "block",
              width: "300px",
              height: "250px",
            }}
            data-ad-client="ca-pub-9895707756303015"
            data-ad-slot={getSlotForPosition(0)}
            data-ad-format={format}
            data-full-width-responsive={responsive ? "true" : "false"}
            id={`${id}-0`}
          />
        </div>

        {/* 두 번째 광고 - 데스크탑에서만 표시 */}
        {!isMobile && (
          <div style={adContainerStyle}>
            <ins
              className="adsbygoogle"
              style={{
                display: "block",
                width: "300px",
                height: "250px",
              }}
              data-ad-client="ca-pub-9895707756303015"
              data-ad-slot={getSlotForPosition(1)}
              data-ad-format={format}
              data-full-width-responsive={responsive ? "true" : "false"}
              id={`${id}-1`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdInFeed;
