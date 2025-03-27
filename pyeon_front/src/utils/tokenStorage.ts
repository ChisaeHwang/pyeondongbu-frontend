// 토큰 관련 상수
const ACCESS_TOKEN_KEY = "access_token";

// 토큰 저장소
export const tokenStorage = {
  // 액세스 토큰 저장
  setAccessToken: (token: string): void => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  // 액세스 토큰 가져오기
  getAccessToken: (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  // 액세스 토큰 삭제
  removeAccessToken: (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },

  // 토큰 존재 여부 확인
  hasToken: (): boolean => {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  // 모든 토큰 삭제 (로그아웃 시 사용)
  clearTokens: (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};
