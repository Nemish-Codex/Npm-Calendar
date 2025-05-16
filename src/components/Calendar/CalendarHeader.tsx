import React, { useState } from "react";
import styles from "./Calendar.module.css";

interface Props {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onMonthChange?: (date: Date) => void;
  onYearChange?: (date: Date) => void;
  yearRange?: [number, number];
}

export const CalendarHeader: React.FC<Props> = ({
  currentDate,
  onPrev,
  onNext,
  onMonthChange,
  onYearChange,
  yearRange = [1900, 2100],
}) => {
  const [showMonthSelect, setShowMonthSelect] = useState(false);
  const [showYearSelect, setShowYearSelect] = useState(false);

  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(2000, i, 1).toLocaleString("default", { month: "long" })
  );

  const years = Array.from(
    { length: yearRange[1] - yearRange[0] + 1 },
    (_, i) => yearRange[0] + i
  );

  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(monthIndex);
    onMonthChange?.(newDate);
    setShowMonthSelect(false);
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    onYearChange?.(newDate);
    setShowYearSelect(false);
  };

  return (
    <div className={styles.header}>
      <button onClick={onPrev} className={styles.headerButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <div className={styles.headerControls}>
        <div className={styles.selectContainer}>
          <button
            className={styles.headerSelect}
            onClick={() => setShowMonthSelect(!showMonthSelect)}
          >
            {currentMonth}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={showMonthSelect ? styles.rotated : ""}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {showMonthSelect && (
            <div className={styles.selectDropdown}>
              {months.map((month, index) => (
                <button
                  key={month}
                  onClick={() => handleMonthSelect(index)}
                  className={`${styles.selectOption} ${
                    month === currentMonth ? styles.selected : ""
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.selectContainer}>
          <button
            className={styles.headerSelect}
            onClick={() => setShowYearSelect(!showYearSelect)}
          >
            {currentYear}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={showYearSelect ? styles.rotated : ""}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {showYearSelect && (
            <div className={`${styles.selectDropdown} ${styles.yearDropdown}`}>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearSelect(year)}
                  className={`${styles.selectOption} ${
                    year === currentYear ? styles.selected : ""
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <button onClick={onNext} className={styles.headerButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
};
