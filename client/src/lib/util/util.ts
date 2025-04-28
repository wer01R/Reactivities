import { DateArg, format, formatDistanceToNow } from "date-fns";
import { z } from "zod";

export function formatDate(date: DateArg<Date>) {
  return format(date, "yyyy-MM-dd h:mm a")
}

export function timeAgo(date: DateArg<Date>) {
  console.log(date);
  return formatDistanceToNow(date) + " ago";
}

export const requiredString = (fieldName: string) => 
  z.string({required_error: `${fieldName} is required`})
    .min(1, `${fieldName} is required`)