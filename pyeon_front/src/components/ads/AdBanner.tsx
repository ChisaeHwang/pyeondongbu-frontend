import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdBannerProps {
  className?: string;
  style?: React.CSSProperties;
  responsive?: boolean;
}

/**
 * 구글 애드센스 광고 컴포넌트 (직접 스크립트 삽입 방식)
 */
const AdBanner: React.FC<AdBannerProps> = ({
  className = "",
  style = {},
  responsive = true,
}) => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 현재 ref 노드를 로컬 변수에 저장 (클린업 함수에서 사용)
    const currentContainer = adContainerRef.current;

    // 광고 스크립트 로드
    const loadAd = () => {
      try {
        if (!currentContainer) return;

        // 이전 내용 정리
        currentContainer.innerHTML = "";

        // 광고 요소 생성
        const adContainer = document.createElement("div");
        adContainer.className = "ad-content";

        // 광고 스크립트 추가
        adContainer.innerHTML = `
          <ins class="adsbygoogle"
              style="display:${responsive ? "block" : "inline-block"};width:${
          responsive ? "100%" : "300px"
        };height:250px"
              data-ad-client="ca-pub-9895707756303015"
              data-ad-slot="5409996939"></ins>
        `;

        currentContainer.appendChild(adContainer);

        // 광고 로드
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (pushError) {
          console.error("광고 로드 중 오류:", pushError);
        }
      } catch (error) {
        console.error("광고 로드 중 오류:", error);
      }
    };

    // 광고 로드
    const timer = setTimeout(() => {
      loadAd();
    }, 100);

    return () => {
      clearTimeout(timer);
      // 컴포넌트 언마운트 시 정리 (저장된 로컬 변수 사용)
      if (currentContainer) {
        currentContainer.innerHTML = "";
      }
    };
  }, [responsive]);

  return (
    <div
      ref={adContainerRef}
      className={`ad-banner ${className}`}
      style={{
        display: "block",
        textAlign: "center",
        margin: "20px auto",
        maxWidth: responsive ? "100%" : "300px",
        minHeight: "280px", // 광고 높이 + 여백
        ...style,
      }}
      data-ad-format="rectangle"
    />
  );
};

export default AdBanner;
