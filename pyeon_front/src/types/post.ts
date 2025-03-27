// 예외 응답 인터페이스
export interface ExceptionResponse {
  status: number;
  message: string;
}

// 댓글 인터페이스
export interface Comment {
  id: number;
  content: string;
  memberEmail: string;
  memberNickname: string;
  createdAt: string;
  modifiedAt: string;
}

// 게시글 인터페이스
export interface Post {
  id: number;
  title: string;
  content: string;
  memberEmail: string;
  memberNickname: string;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  modifiedAt: string;
  mainCategory: string;
  subCategory: string;
  comments: Comment[];
  hasLiked: boolean;
}

// 백엔드 응답 타입
export interface PostResponse {
  id: number;
  title: string;
  content: string;
  memberEmail: string;
  memberNickname: string;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  modifiedAt: string;
  mainCategory: string;
  subCategory: string;
  comments: Comment[];
  hasLiked: boolean;
}

// 게시글 생성/수정 데이터 인터페이스
export interface PostFormData {
  title: string;
  content: string;
  mainCategory: string;
  subCategory: string;
}
