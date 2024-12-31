export interface Notice {
  id: number;
  title: string;
  content: string;
  publishedAt: string;
  important?: boolean; // 중요 공지 여부
}
