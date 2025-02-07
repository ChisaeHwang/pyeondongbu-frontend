const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  env: process.env.REACT_APP_ENV,
  endpoints: {
    auth: {
      googleLogin: "/oauth2/authorization/google",
      googleCallback: "/api/auth/login/google/callback",
      logout: "/api/auth/logout",
    },
  },
} as const;

export default API_CONFIG;
