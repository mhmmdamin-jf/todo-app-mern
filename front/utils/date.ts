import { format, isAfter } from "date-fns";
/**
 * convert date.now to custom formated
 * @returns {string} formated date
 */
export const todayFormatDate = () => format(Date.now(), "eeee,MMMM d");

/**
 * convert input date to custom format
 * @param {Date} date
 * @returns {string} formated date
 */
export const customDateFormat = (date: Date) => format(date, "eeee,MMMM d");
export const compareWithToday = (date: Date | string) =>
  isAfter(date, Date.now());
export const customDueDateFormat = (date: Date) =>
  format(date, "eeee,MMMM d, H:K");
