export interface Job {
  id: number;
  title: string;
  content: string;
  publisher: {
    name: string;
    image: string;
    platform: string;
  };
  skills: string[];
  videoType: string[];
  publishedAt: string;
  platform: string;
}

// 실제 사용되는 플랫폼 타입
export type PublisherPlatform = "youtube" | "chzzk" | "soop";
export type PostPlatform = "youtube" | "x" | "naver";
