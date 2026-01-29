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
      <div className={styles.timeSection}>
        <div className={styles.timeColumn}>
          <button
            onClick={() => setHour((h) => (h === 12 ? 1 : h + 1))}
            className={styles.timeButton}
          >
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
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
          <div className={styles.timeText}>{format(hour)}</div>
          <button
            onClick={() => setHour((h) => (h === 1 ? 12 : h - 1))}
            className={styles.timeButton}
          >
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
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
        <div className={styles.timeSeparator}>:</div>
        <div className={styles.timeColumn}>
          <button
            onClick={() => setMinute((m) => (m + 1) % 60)}
            className={styles.timeButton}
          >
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
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
          <div className={styles.timeText}>{format(minute)}</div>
          <button
            onClick={() => setMinute((m) => (m - 1 + 60) % 60)}
            className={styles.timeButton}
          >
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
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.ampmToggle}>
        <div className={styles.ampmSlider} data-am={isAM.toString()} />
        <button
          onClick={() => setIsAM(true)}
          className={`${styles.ampmButton} ${isAM ? styles.active : ""}`}
        >
          AM
        </button>
        <button
          onClick={() => setIsAM(false)}
          className={`${styles.ampmButton} ${!isAM ? styles.active : ""}`}
        >
          PM
        </button>
      </div>
    </div>
  );
};
