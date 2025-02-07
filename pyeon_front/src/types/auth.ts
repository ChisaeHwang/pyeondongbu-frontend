export interface TokenResponse {
  accessToken: string;
}

export interface AuthError {
  message: string;
  code: string;
}

export interface AuthUserResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  authority: string;
}

export interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}
