import React, { useState } from "react";
import styles from "./Calendar.module.css";
import { getMonthDates, isSameDate, isDateInRange } from "./utils";

interface CalendarGridProps {
  currentDate: Date;
  selectedDates: Date[];
  onSelectDate: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  isRange?: boolean;
  isMulti?: boolean;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  selectedDates,
  onSelectDate,
  minDate,
  maxDate,
  isRange = false,
  isMulti = false,
}) => {
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const dates = getMonthDates(currentDate);
  const dayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const today = new Date();

  const isDateDisabled = (date: Date) => {
    const isCurrentMonth = date.getMonth() === currentDate.getMonth();
    if (!isCurrentMonth) return true;

    if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) return true;
    if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999)))
      return true;

    return false;
  };

  const getDateClassName = (date: Date) => {
    const classes = [styles.dayCell];

    if (isDateDisabled(date)) {
      classes.push(styles.faded);
    }

    if (isSameDate(date, today)) {
      classes.push(styles.today);
    }

    if (isMulti) {
      if (selectedDates.some((d) => isSameDate(d, date))) {
        classes.push(styles.selected);
      }
    } else if (isRange && selectedDates.length === 2) {
      if (isDateInRange(date, selectedDates[0], selectedDates[1])) {
        classes.push(styles.inRange);
      }
      if (
        isSameDate(date, selectedDates[0]) ||
        isSameDate(date, selectedDates[1])
      ) {
        classes.push(styles.selected);
      }
    } else if (isRange && selectedDates.length === 1 && hoverDate) {
      const start = selectedDates[0];
      const end = hoverDate;

      if (
        isDateInRange(
          date,
          start < end ? start : end,
          start < end ? end : start
        )
      ) {
        classes.push(styles.inRange);
      }

      if (isSameDate(date, selectedDates[0])) {
        classes.push(styles.selected);
      }
    } else if (
      selectedDates.some((selectedDate) => isSameDate(date, selectedDate))
    ) {
      classes.push(styles.selected);
    }

    return classes.join(" ");
  };

  const handleMouseEnter = (date: Date) => {
    if (isRange && selectedDates.length === 1 && !isDateDisabled(date)) {
      setHoverDate(date);
    }
  };

  const handleMouseLeave = () => {
    setHoverDate(null);
  };

  return (
    <div className={styles.grid}>
      {dayLabels.map((day) => (
        <div key={day} className={styles.dayLabel}>
          {day}
        </div>
      ))}
      {dates.map((date, index) => (
        <button
          key={index}
          onClick={() => !isDateDisabled(date) && onSelectDate(date)}
          onMouseEnter={() => handleMouseEnter(date)}
          onMouseLeave={handleMouseLeave}
          className={getDateClassName(date)}
          disabled={isDateDisabled(date)}
          data-date={date.toISOString()}
          type="button"
        >
          {date.getDate()}
        </button>
      ))}
    </div>
  );
};
