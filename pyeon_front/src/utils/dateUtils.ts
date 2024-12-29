import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 7) {
    return formatDistanceToNow(date, { addSuffix: true, locale: ko });
  }
  return format(date, "M월 d일", { locale: ko });
};
