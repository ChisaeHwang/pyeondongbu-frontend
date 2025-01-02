// utils/youtube.ts
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const thumbnailCache: Record<string, string> = {};

export const getChannelThumbnail = async (channelId: string) => {
  // 캐시된 썸네일이 있으면 반환
  if (thumbnailCache[channelId]) {
    return thumbnailCache[channelId];
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${YOUTUBE_API_KEY}`
    );
    const data = await response.json();
    const thumbnailUrl = data.items[0]?.snippet.thumbnails.default.url;

    // 캐시에 저장
    if (thumbnailUrl) {
      thumbnailCache[channelId] = thumbnailUrl;
    }

    return thumbnailUrl;
  } catch (error) {
    console.error("Failed to fetch channel thumbnail:", error);
    return null;
  }
};
