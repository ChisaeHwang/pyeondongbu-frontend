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
  format = "rectangle",
  responsive = false,
  style = {},
  id = `ad-${Math.random().toString(36).substring(2, 10)}`,
  adPosition,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const adLoaded = useRef<boolean[]>([false, false]);
  const adElementRef = useRef<HTMLDivElement>(null);
  const attemptCount = useRef<number>(0);

  // 디버깅 정보 표시
  const debugInfo = useMemo(
    () => ({
      id,
      adPosition,
      isMobileView: isMobile,
    }),
    [id, adPosition, isMobile]
  );

  console.log(`[AdInFeed] 초기화:`, debugInfo);

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

      console.log(`[AdInFeed] 광고 로드 시도 (${delay}ms 후):`, {
        ...debugInfo,
        index,
        slot: getSlotForPosition(index),
        attemptCount: attemptCount.current,
      });

      // 광고가 로드될 때까지 약간 대기
      setTimeout(() => {
        if (!window.adsbygoogle) {
          console.warn(
            "[AdInFeed] 애드센스가 초기화되지 않았습니다:",
            debugInfo
          );
          return;
        }

        const adstatus = adElement.getAttribute("data-ad-status");
        if (!adstatus || adstatus !== "filled") {
          // 광고가 아직 로드되지 않은 경우에만 로드 시도
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            adLoaded.current[index] = true;
            attemptCount.current++;

            console.log(`[AdInFeed] 광고 푸시 성공:`, {
              ...debugInfo,
              index,
              slot: getSlotForPosition(index),
            });

            // 상태 확인을 위한 MutationObserver 설정
            const observer = new MutationObserver((mutations) => {
              mutations.forEach((mutation) => {
                if (
                  mutation.type === "attributes" &&
                  mutation.attributeName === "data-ad-status"
                ) {
                  const status = adElement.getAttribute("data-ad-status");
                  console.log(`[AdInFeed] 광고 상태 변경:`, {
                    ...debugInfo,
                    index,
                    status,
                  });

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
            console.error(
              "[AdInFeed] 광고 푸시 중 오류:",
              pushError,
              debugInfo
            );
          }
        } else {
          console.log(`[AdInFeed] 이미 광고가 로드된 요소입니다:`, {
            ...debugInfo,
            index,
            adstatus,
          });
        }
      }, delay);
    };

    try {
      // 모든 광고 요소 찾기
      const adElements =
        adElementRef.current?.querySelectorAll("ins.adsbygoogle");
      if (!adElements || adElements.length === 0) {
        console.warn("[AdInFeed] 광고 요소를 찾을 수 없습니다:", debugInfo);
        return;
      }

      console.log(`[AdInFeed] 광고 요소 찾음:`, {
        ...debugInfo,
        count: adElements.length,
      });

      // 첫 번째 광고 항상 로드
      loadAd(0, adElements[0]);

      // 데스크탑에서는 두 번째 광고도 로드
      if (!isMobile && adElements.length > 1) {
        loadAd(1, adElements[1]);
      }
    } catch (e) {
      console.error(
        "[AdInFeed] 인피드 애드센스 광고 로드 중 오류:",
        e,
        debugInfo
      );
    }
  }, [isMobile, id, getSlotForPosition, debugInfo]);

  // iframe이 overflow 되는 것을 방지하기 위한 스타일 변수
  const adContainerStyle: React.CSSProperties = {
    position: "relative",
    width: "300px",
    height: "250px",
    overflow: "hidden", // 컨테이너를 벗어나는 요소 숨김
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
              id={`${id}-1`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdInFeed;
