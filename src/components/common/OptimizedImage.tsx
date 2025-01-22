import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  isPriority?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  isPriority = false
}: OptimizedImageProps) {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      effect="blur"
      className={className}
      threshold={100}
      loading={isPriority ? 'eager' : 'lazy'}
      placeholderSrc={`${src}?w=50`} // 저해상도 이미지를 플레이스홀더로 사용
      wrapperClassName="w-full h-full"
    />
  );
}