import { DateArg, format } from "date-fns";

export function formatDate(date: DateArg<Date>) {
  return format(date, "yyyy-MM-dd h:mm a")
}