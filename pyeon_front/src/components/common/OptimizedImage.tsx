import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { getImageUrl } from "../../utils/imageUrl";

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
  // Cloudflare Workers를 통한 최적화된 이미지 URL 생성
  const optimizedSrc = getImageUrl(src);
  const placeholderSrc = `${optimizedSrc}?w=50`;

  return (
    <LazyLoadImage
      src={optimizedSrc}
      alt={alt}
      effect="blur"
      className={className}
      threshold={threshold}
      loading={isPriority ? "eager" : "lazy"}
      placeholderSrc={placeholderSrc}
      wrapperClassName="w-full h-full"
      visibleByDefault={visibleByDefault}
      delayMethod={delayMethod}
      delayTime={delayTime}
    />
  );
}
