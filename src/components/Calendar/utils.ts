export const getMonthDates = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();

  // Get first day of the month
  const firstDay = new Date(year, month, 1);
  const firstDayWeekday = firstDay.getDay();

  // Get last day of the month
  const lastDay = new Date(year, month + 1, 0);
  const lastDayWeekday = lastDay.getDay();

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

export const isSameDate = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();
