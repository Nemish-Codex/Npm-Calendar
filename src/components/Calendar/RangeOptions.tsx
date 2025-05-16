import React from "react";
import styles from "./Calendar.module.css";

interface RangeOption {
  label: string;
  getRange: () => [Date, Date];
}

interface Props {
  onSelect: (range: [Date, Date]) => void;
  selectedRange?: [Date, Date];
}

export const RangeOptions: React.FC<Props> = ({ onSelect, selectedRange }) => {
  const isRangeEqual = (range1?: [Date, Date], range2?: [Date, Date]) => {
    if (!range1 || !range2) return false;
    return (
      range1[0].getTime() === range2[0].getTime() &&
      range1[1].getTime() === range2[1].getTime()
    );
  };

  const getThisWeekRange = (): [Date, Date] => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);

    return [start, end];
  };

  const getLastWeekRange = (): [Date, Date] => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay() - 7);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);

    return [start, end];
  };

  const getThisMonthRange = (): [Date, Date] => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    start.setHours(0, 0, 0, 0);

    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);

    return [start, end];
  };

  const getLastMonthRange = (): [Date, Date] => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    start.setHours(0, 0, 0, 0);

    const end = new Date(today.getFullYear(), today.getMonth(), 0);
    end.setHours(23, 59, 59, 999);

    return [start, end];
  };

  const options: RangeOption[] = [
    { label: "This Week", getRange: getThisWeekRange },
    { label: "Last Week", getRange: getLastWeekRange },
    { label: "This Month", getRange: getThisMonthRange },
    { label: "Last Month", getRange: getLastMonthRange },
  ];

  return (
    <div className={styles.rangeOptions}>
      <div className={styles.rangeOptionsTitle}>Quick Select</div>
      {options.map((option) => (
        <button
          key={option.label}
          className={`${styles.rangeOptionButton} ${
            isRangeEqual(selectedRange, option.getRange())
              ? styles.rangeOptionSelected
              : ""
          }`}
          onClick={() => onSelect(option.getRange())}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
