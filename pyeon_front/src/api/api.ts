const API_CONFIG = {
  // 환경 변수에서 API 기본 URL 가져오기
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://api.pyeondongbu.com",
  env: process.env.REACT_APP_ENV || "development",
  endpoints: {
    auth: {
      googleLogin: "/oauth2/authorization/google",
      googleCallback: "/api/auth/login/google/callback",
      logout: "/api/auth/logout",
    },
  },
} as const;

export default API_CONFIG;
