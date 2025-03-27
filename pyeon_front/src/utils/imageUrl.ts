/**
 * Cloudflare 워커를 통한 S3 이미지 프록시 URL 생성 함수
 *
 * @param imageKey 이미지 키 또는 전체 URL
 * @returns 최적화된 이미지 URL
 */
export function getImageUrl(imageKey: string): string {
  // 이미지 키가 없으면 기본 이미지 반환
  if (!imageKey) return "/default-image.png";

  const s3BucketUrl =
    process.env.REACT_APP_S3_BUCKET_URL ||
    "https://pyeon.s3.ap-northeast-2.amazonaws.com/images";
  const cloudflareUrl =
    process.env.REACT_APP_CLOUDFLARE_IMAGE_URL ||
    "https://s3-images.pyeondongbu.com/images";

  // 이미 전체 URL이고 S3 URL이면 Cloudflare 워커 도메인으로 변환
  if (imageKey.includes("pyeon.s3.ap-northeast-2.amazonaws.com")) {
    // S3 URL을 Cloudflare 워커 URL로 변환
    return imageKey.replace(`${s3BucketUrl}/`, `${cloudflareUrl}/`);
  }

  // 이미지 키만 있는 경우 전체 URL 구성
  // 이미 다른 도메인의 전체 URL인 경우 그대로 반환
  if (imageKey.startsWith("http")) {
    return imageKey;
  }

  // 이미지 키로 Cloudflare 워커 URL 구성
  return `${cloudflareUrl}/${imageKey}`;
}
