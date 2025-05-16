import { DateFormat, WeekStart } from "./types";

export const getMonthDates = (date: Date, weekStart: WeekStart = 0): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();

  // Get first day of the month
  const firstDay = new Date(year, month, 1);
  let firstDayWeekday = firstDay.getDay();

  // Adjust for week start
  if (weekStart === 1) {
    // Monday
    firstDayWeekday = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1;
  } else if (weekStart === 6) {
    // Saturday
    firstDayWeekday = (firstDayWeekday + 1) % 7;
  }

  // Get last day of the month
  const lastDay = new Date(year, month + 1, 0);
  let lastDayWeekday = lastDay.getDay();

  // Adjust for week start
  if (weekStart === 1) {
    // Monday
    lastDayWeekday = lastDayWeekday === 0 ? 6 : lastDayWeekday - 1;
  } else if (weekStart === 6) {
    // Saturday
    lastDayWeekday = (lastDayWeekday + 1) % 7;
  }

  const dates: Date[] = [];

  // Add days from previous month
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    dates.push(new Date(year, month, -i));
  }

  // Add days from current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    dates.push(new Date(year, month, i));
  }

  // Add days from next month
  for (let i = 1; i <= 6 - lastDayWeekday; i++) {
    dates.push(new Date(year, month + 1, i));
  }

  return dates;
};

export const isSameDate = (a: Date | null, b: Date | null): boolean => {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

export const isDateInRange = (date: Date, start: Date, end: Date): boolean => {
  if (!date || !start || !end) return false;
  const normalizedDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const normalizedStart = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );
  const normalizedEnd = new Date(
    end.getFullYear(),
    end.getMonth(),
    end.getDate()
  );
  return normalizedDate >= normalizedStart && normalizedDate <= normalizedEnd;
};

export const isDateDisabled = (
  date: Date,
  {
    minDate,
    maxDate,
    disabledDates,
    enabledDates,
    disabledDays,
  }: {
    minDate?: Date;
    maxDate?: Date;
    disabledDates?: Date[];
    enabledDates?: Date[];
    disabledDays?: number[];
  }
): boolean => {
  // Check if date is in enabled dates
  if (enabledDates?.length) {
    return !enabledDates.some((enabledDate) => isSameDate(date, enabledDate));
  }

  // Check min/max dates
  if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) return true;
  if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999)))
    return true;

  // Check disabled dates
  if (disabledDates?.some((disabledDate) => isSameDate(date, disabledDate)))
    return true;

  // Check disabled days
  if (disabledDays?.includes(date.getDay())) return true;

  return false;
};

export const formatDate = (
  date: Date,
  format: string | DateFormat,
  locale = "default"
): string => {
  if (!date) return "";

  if (typeof format === "string") {
    // Validate if the format contains valid date patterns
    const hasValidDatePattern = /[d|m|y]/i.test(format);
    const isTimeOnlyPattern = /^[H|h|M|s|:|\s]+$/i.test(format);

    // If format is invalid or time-only pattern, use default date format
    if (!hasValidDatePattern || isTimeOnlyPattern) {
      format = "dd/mm/yyyy";
    }

    const pad = (num: number) => num.toString().padStart(2, "0");
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    // Process date patterns first
    let formattedDate = format
      .replace(/yyyy/g, year.toString())
      .replace(/yy/g, year.toString().slice(-2))
      .replace(/mm/g, month)
      .replace(/m/g, (date.getMonth() + 1).toString())
      .replace(/dd/g, day)
      .replace(/d/g, date.getDate().toString());

    // Only process time patterns if they exist in the format
    if (/[H|h|M|s]/g.test(format)) {
      formattedDate = formattedDate
        .replace(/HH/g, hours)
        .replace(/H/g, date.getHours().toString())
        .replace(/MM/g, minutes)
        .replace(/M/g, date.getMinutes().toString())
        .replace(/ss/g, seconds)
        .replace(/s/g, date.getSeconds().toString());
    }

    return formattedDate;
  }

  try {
    return new Intl.DateTimeFormat(locale, format).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return date.toLocaleDateString();
  }
};

export const getDayNames = (
  weekStart: WeekStart = 0,
  format: "long" | "short" | "narrow" = "short",
  locale = "default"
): string[] => {
  const days = [];
  const formatter = new Intl.DateTimeFormat(locale, { weekday: format });

  for (let i = 0; i < 7; i++) {
    const day = new Date(2024, 0, ((i + weekStart) % 7) + 1); // Using 2024 January as it starts with Monday
    days.push(formatter.format(day));
  }

  return days;
};

export const getWeekNumber = (date: Date): number => {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
};
