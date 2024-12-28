export interface Job {
  id: number;
  title: string;
  content: string;
  publisher: {
    name: string;
    image?: string;
    link?: string;
    platform: "youtube" | "chzzk" | "soop";
  };
  skills?: string[];
  videoType?: string;
  publishedAt: string;
  platform: "youtube" | "chzzk" | "soop" | "x";
}
