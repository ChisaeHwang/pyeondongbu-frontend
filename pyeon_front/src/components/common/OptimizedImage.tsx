import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  isPriority?: boolean;
  visibleByDefault?: boolean; // 즉시 표시 여부
  delayMethod?: "debounce" | "throttle"; // 지연 로딩 방식
  delayTime?: number; // 지연 시간
  threshold?: number; // 뷰포트 진입 전 로딩 시작 거리
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  isPriority = false,
  visibleByDefault = false,
  delayMethod = "debounce",
  delayTime = 500,
  threshold = 100,
}: OptimizedImageProps) {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      effect="blur"
      className={className}
      threshold={threshold}
      loading={isPriority ? "eager" : "lazy"}
      placeholderSrc={`${src}?w=50`} // 저해상도 이미지를 플레이스홀더로 사용
      wrapperClassName="w-full h-full"
      visibleByDefault={visibleByDefault}
      delayMethod={delayMethod}
      delayTime={delayTime}
    />
  );
}
