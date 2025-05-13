import React from "react";
import styles from "./Calendar.module.css";
import { getMonthDates } from "./utils";

interface CalendarGridProps {
  currentDate: Date;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  selectedDate,
  onSelectDate,
}) => {
  const dates = getMonthDates(currentDate);
  const dayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  return (
    <>
      <div className={styles.grid}>
        {dayLabels.map((day) => (
          <div key={day} className={styles.dayLabel}>
            {day}
          </div>
        ))}
        {dates.map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          return (
            <button
              key={index}
              onClick={isCurrentMonth ? () => onSelectDate(date) : undefined}
              className={`${styles.dayCell} ${
                selectedDate && isSameDate(date, selectedDate)
                  ? styles.selected
                  : ""
              } ${!isCurrentMonth ? styles.faded : ""}`}
              disabled={!isCurrentMonth}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </>
  );
};
