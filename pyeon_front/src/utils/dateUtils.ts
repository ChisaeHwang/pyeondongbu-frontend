/**
 * 날짜를 포맷팅하는 유틸리티 함수
 * @param dateString ISO 형식의 날짜 문자열
 * @returns 포맷팅된 날짜 문자열 (예: 25년 2월 7일)
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  // 유효한 날짜인지 확인
  if (isNaN(date.getTime())) {
    return "날짜 정보 없음";
  }

  const year = date.getFullYear().toString().slice(-2); // 연도의 마지막 두 자리
  const month = date.getMonth() + 1; // 월 (0부터 시작하므로 1 더함)
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

/**
 * 날짜와 시간을 포맷팅하는 유틸리티 함수
 * @param dateString ISO 형식의 날짜 문자열
 * @returns 포맷팅된 날짜와 시간 문자열 (예: 2023.05.15 14:30)
 */
export const formatDateWithTime = (dateString: string): string => {
  const date = new Date(dateString);

  // 유효한 날짜인지 확인
  if (isNaN(date.getTime())) {
    return "날짜 정보 없음";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

/**
 * 상대적인 시간을 표시하는 함수 (예: "3일 전", "방금 전")
 * @param dateString ISO 형식의 날짜 문자열
 * @returns 상대적인 시간 문자열
 */
export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);

  // 유효한 날짜인지 확인
  if (isNaN(date.getTime())) {
    return "날짜 정보 없음";
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // 1분 미만
  if (diffInSeconds < 60) {
    return "방금 전";
  }

  // 1시간 미만
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  // 24시간 미만
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  // 30일 미만
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}일 전`;
  }

  // 12개월 미만
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}개월 전`;
  }

  // 1년 이상
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}년 전`;
};

/**
 * 스마트 날짜 표시 함수 - 24시간 이내면 상대적 시간, 그 이상이면 포맷팅된 날짜 반환
 * @param dateString ISO 형식의 날짜 문자열
 * @returns 상대적 시간 또는 포맷팅된 날짜
 */
export const getSmartDate = (dateString: string): string => {
  const date = new Date(dateString);

  // 유효한 날짜인지 확인
  if (isNaN(date.getTime())) {
    return "날짜 정보 없음";
  }

  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

  // 24시간 이내면 상대적 시간 표시
  if (diffInHours < 24) {
    return getRelativeTime(dateString);
  }

  // 그 이상이면 포맷팅된 날짜 표시
  return formatDate(dateString);
};
