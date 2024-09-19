import { format, isToday, isYesterday } from "date-fns";

export const formatDateLabel = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "YesterDay";
  return format(date, "EEEE, MMMM d");
};

export const TIME_THRESHOLD = 5;