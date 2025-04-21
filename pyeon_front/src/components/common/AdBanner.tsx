import React, { useEffect, useState, useRef } from "react";

interface AdBannerProps {
  className?: string;
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  style?: React.CSSProperties;
}

const AdBanner: React.FC<AdBannerProps> = ({
  className = "",
  slot,
  format = "auto",
  responsive = true,
  style = {},
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  const adInsRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // 모바일 기기 감지 함수 (UserAgent + 화면 크기)
    const checkDevice = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      const isSmallScreen = window.innerWidth < 768;

      // 모바일 기기이거나 화면이 작으면 모바일로 처리
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    // 초기 확인
    checkDevice();

    // 이벤트 리스너 등록 (화면 크기 변경, 방향 전환)
    window.addEventListener("resize", checkDevice);
    window.addEventListener("orientationchange", () => {
      // orientationchange 이벤트 후에는 약간의 지연을 두고 확인
      // (일부 기기에서 방향 전환 직후 크기가 즉시 반영되지 않는 문제 해결)
      setTimeout(checkDevice, 100);
    });

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("orientationchange", () => {
        setTimeout(checkDevice, 100);
      });
    };
  }, []);

  useEffect(() => {
    try {
      // AdSense 코드 추가
      const adsbygoogle = window.adsbygoogle || [];
      adsbygoogle.push({});
    } catch (e) {
      // 에러 발생시 조용히 실패
    }
  }, [slot, isMobile]); // isMobile 변경 시에도 광고 다시 로드

  // 화면 회전이나 크기 변경 시 광고 컨테이너 스타일 업데이트
  useEffect(() => {
    const updateAdStyles = () => {
      if (adRef.current && adInsRef.current) {
        // 컨테이너 스타일 업데이트
        adRef.current.style.width = isMobile ? "250px" : "100%";

        // 광고 요소 스타일 업데이트
        adInsRef.current.style.width = "100%";
        adInsRef.current.style.height = "100%";
      }
    };

    updateAdStyles();
  }, [isMobile]);

  // 모바일에서는 250px 고정, 데스크탑에서는 100%
  const adContainerStyle: React.CSSProperties = {
    width: isMobile ? "250px" : "100%",
    maxWidth: "650px",
    margin: "0 auto",
    position: "relative",
    minHeight: "250px",
    ...style,
  };

  return (
    <div
      className={`ad-container ${className}`}
      style={adContainerStyle}
      ref={adRef}
    >
      <ins
        ref={adInsRef}
        className="adsbygoogle"
        style={{
          display: "block",
          textAlign: "center",
          width: "100%",
          height: "100%",
        }}
        data-ad-client="ca-pub-9895707756303015"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
};

export default AdBanner;
