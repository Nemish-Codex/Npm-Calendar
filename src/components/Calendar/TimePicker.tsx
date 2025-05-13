import React from "react";
import styles from "./Calendar.module.css";

interface Props {
  hour: number;
  minute: number;
  isAM: boolean;
  setHour: (val: number | ((h: number) => number)) => void;
  setMinute: (val: number | ((m: number) => number)) => void;
  setIsAM: (val: boolean) => void;
}

export const TimePicker: React.FC<Props> = ({
  hour,
  minute,
  isAM,
  setHour,
  setMinute,
  setIsAM,
}) => {
  const format = (val: number) => val.toString().padStart(2, "0");

  return (
    <div className={styles.timePicker}>
      <div className={styles.flex}>
        <div className={styles.timeColumn}>
          <svg
            onClick={() => setHour((h) => (h === 12 ? 1 : h + 1))}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={styles.timeCell}
          >
            <path d="m18 15-6-6-6 6" />
          </svg>

          <div className={styles.timeText}>{format(hour)}</div>

          <svg
            onClick={() => setHour((h) => (h === 1 ? 12 : h - 1))}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={styles.timeCell}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        <div className={styles.timeColumn}>
          <svg
            onClick={() => setMinute((m) => (m + 1) % 60)}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={styles.timeCell}
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
          <div className={styles.timeText}>{format(minute)}</div>

          <svg
            onClick={() => setMinute((m) => (m - 1 + 60) % 60)}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={styles.timeCell}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
      <div className={styles.timeColumn}>
        <div>
          <button
            onClick={() => setIsAM(true)}
            className={isAM ? styles.active : styles.inactive}
          >
            AM
          </button>
          <button
            onClick={() => setIsAM(false)}
            className={!isAM ? styles.active : styles.inactive}
          >
            PM
          </button>
        </div>
      </div>
    </div>
  );
};
