import React from "react";
import styles from "./Calendar.module.css";

interface Props {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
}

export const CalendarHeader: React.FC<Props> = ({
  currentDate,
  onPrev,
  onNext,
}) => {
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <div className={styles.header}>
      <svg
        onClick={onPrev}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-chevron-left-icon lucide-chevron-left"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>

      <span>
        {month} {year}
      </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        onClick={onNext}
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-chevron-right-icon lucide-chevron-right"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </div>
  );
};
