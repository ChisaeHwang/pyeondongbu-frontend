// Cloudflare 워커 스크립트 - s3-image-proxy
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // CORS 헤더 설정
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "public, max-age=14400", // 4시간 캐싱
  };

  // OPTIONS 요청 처리 (CORS preflight)
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // URL에서 이미지 경로 추출
    const url = new URL(request.url);
    let imagePath = url.pathname.replace(/^\/images\//, "");

    // S3 URL 구성
    const s3Url = `https://pyeon.s3.ap-northeast-2.amazonaws.com/images/${imagePath}`;

    // S3에서 이미지 가져오기
    const response = await fetch(s3Url, request);

    // 응답이 성공적이지 않으면 오류 반환
    if (!response.ok) {
      return new Response("Image not found", { status: 404 });
    }

    // 응답 복제하고 CORS 및 캐싱 헤더 추가
    const newResponse = new Response(response.body, response);
    Object.keys(corsHeaders).forEach((key) => {
      newResponse.headers.set(key, corsHeaders[key]);
    });

    return newResponse;
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
