import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdBannerProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 구글 애드센스 광고 컴포넌트 (확실한 로딩 방식)
 */
const AdBanner: React.FC<AdBannerProps> = ({ className = "", style = {} }) => {
  const [adLoaded, setAdLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // 광고 로드 시도 최대 횟수 (최대 30초까지 시도)
    const maxAttempts = 20;
    let mounted = true;

    const loadAd = () => {
      if (!mounted) return;

      try {
        if (
          window.adsbygoogle &&
          typeof window.adsbygoogle.push === "function"
        ) {
          console.log("AdSense 광고 로드 시도 중...");
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          setAdLoaded(true);
          console.log("AdSense 광고 로드 명령 실행됨");
        } else {
          console.log(
            `AdSense가 준비되지 않음, 재시도 중... (시도: ${
              retryCount + 1
            }/${maxAttempts})`
          );
          if (retryCount < maxAttempts) {
            setRetryCount((prev) => prev + 1);
            setTimeout(loadAd, 1500); // 1.5초마다 재시도
          } else {
            console.warn("최대 시도 횟수 초과, 광고 로드 실패");
          }
        }
      } catch (error) {
        console.error("AdSense 로드 오류:", error);
        if (retryCount < maxAttempts) {
          setRetryCount((prev) => prev + 1);
          setTimeout(loadAd, 1500);
        }
      }
    };

    // 페이지 로드 후 약간의 지연 시간을 두고 광고 로드 시작
    const timer = setTimeout(loadAd, 500);

    // 컴포넌트 언마운트시 정리
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [retryCount]);

  // 로딩 중 표시 메시지
  const getLoadingMessage = () => {
    if (retryCount <= 3) return "광고 로드 중...";
    if (retryCount <= 7) return "광고 준비 중...";
    if (retryCount <= 12) return "잠시만 기다려 주세요...";
    return "광고를 불러오는 중입니다...";
  };

  return (
    <div
      className={`ad-container ${className}`}
      style={{
        textAlign: "center",
        margin: "30px auto",
        minHeight: "250px",
        position: "relative",
        maxWidth: "100%",
        ...style,
      }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          height: "250px",
          margin: "0 auto",
          background: adLoaded ? "transparent" : "#f1f1f1",
        }}
        data-ad-client="ca-pub-9895707756303015"
        data-ad-slot="5409996939"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      {!adLoaded && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "12px",
            color: "#888",
          }}
        >
          {getLoadingMessage()}
        </div>
      )}
    </div>
  );
};

export default AdBanner;
