import React, { useState, useRef, useEffect } from "react";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import { TimePicker } from "./TimePicker";
import { CalendarProps } from "./types";
import styles from "./Calendar.module.css";
import { formatDate as utilFormatDate, isSameDate } from "./utils";

export const Calendar: React.FC<CalendarProps> = ({
  variant = "default",
  value,
  onChange,
  minDate,
  maxDate,
  theme = {},
  inputStyles = {},
  format,
  disabled = false,
  readOnly = false,
  clearable = true,
  placement = "auto",
  zIndex = 1000,
  className,
  style,
  onOpen,
  onClose,
  onMonthChange,
  onYearChange,
  yearRange,
}) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDates, setSelectedDates] = useState<Date[]>(() => {
    // If value is provided, use it
    if (value) {
      return Array.isArray(value) ? value : [value];
    }

    // If no value is provided and it's not a multi-select, initialize with today's date
    if (variant !== "multi" && variant !== "range") {
      return [today];
    }

    return [];
  });
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [isAM, setIsAM] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [modalStyle, setModalStyle] = useState({});

  const handleDateSelect = (date: Date) => {
    if (variant === "range") {
      if (selectedDates.length === 1) {
        const [firstDate] = selectedDates;
        const newDates =
          firstDate < date ? [firstDate, date] : [date, firstDate];
        setSelectedDates(newDates);
        onChange?.(newDates);
        hideModal(); // Only close after selecting both dates
      } else {
        setSelectedDates([date]);
        onChange?.([date]); // Pass the partial selection to the parent component
      }
    } else if (variant === "multi") {
      // For multi-select, toggle the selection of the date
      const isSelected = selectedDates.some((d) => isSameDate(d, date));
      let newDates;

      if (isSelected) {
        // Remove date if already selected
        newDates = selectedDates.filter((d) => !isSameDate(d, date));
      } else {
        // Add date if not selected
        newDates = [...selectedDates, date];
      }

      setSelectedDates(newDates);
      onChange?.(newDates);
    } else {
      setSelectedDates([date]);
      if (variant !== "time") {
        onChange?.(date);
        hideModal();
      }
    }
  };

  const handleConfirm = () => {
    if (selectedDates.length > 0) {
      if (variant === "time") {
        const date = selectedDates[0];
        date.setHours(isAM ? hour % 12 : (hour % 12) + 12);
        date.setMinutes(minute);
        onChange?.(date);
      } else if (variant === "multi") {
        // For multi-select, just pass the array of selected dates
        onChange?.(selectedDates);
      } else if (variant === "range" && selectedDates.length === 2) {
        // For range, pass the array of start and end dates
        onChange?.(selectedDates);
      }
      hideModal();
    }
  };

  const formatDate = (date: Date) => {
    if (!date) return "";

    // For default variant, strip any time patterns from the format
    if (variant === "default") {
      const defaultFormat = format
        ? format.toString().replace(/[H|h|M|s|:|\s]+/g, "") || "dd/mm/yyyy"
        : "dd/mm/yyyy";
      return utilFormatDate(date, defaultFormat);
    }

    if (variant === "time") {
      return `${utilFormatDate(date, format || "dd/mm/yyyy")} ${hour
        .toString()
        .padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${
        isAM ? "AM" : "PM"
      }`;
    }

    return utilFormatDate(date, format || "dd/mm/yyyy");
  };

  const getFormattedValue = () => {
    if (!selectedDates.length) return "";

    if (variant === "range" && selectedDates.length === 2) {
      return `${formatDate(selectedDates[0])} - ${formatDate(
        selectedDates[1],
      )}`;
    }

    if (variant === "multi") {
      return selectedDates.map((date) => formatDate(date)).join(", ");
    }

    return formatDate(selectedDates[0]);
  };

  const calculateModalPosition = () => {
    if (!inputRef.current) return;

    const rect = inputRef.current.getBoundingClientRect();
    const modalWidth = 260;
    const modalHeight = variant === "time" ? 400 : 360;
    const padding = 12;

    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Mobile view - try to position near input first
    if (viewportWidth <= 768) {
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow >= modalHeight + padding) {
        // Show below input
        setModalStyle({
          position: "fixed",
          top: `${rect.bottom + padding}px`,
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100% - 32px)",
          maxWidth: "280px",
          zIndex,
        });
      } else if (spaceAbove >= modalHeight + padding) {
        // Show above input
        setModalStyle({
          position: "fixed",
          bottom: `${viewportHeight - rect.top + padding}px`,
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100% - 32px)",
          maxWidth: "280px",
          zIndex,
        });
      } else {
        // Fallback to center if no space
        setModalStyle({
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "calc(100% - 32px)",
          maxWidth: "280px",
          zIndex,
        });
      }
      return;
    }

    // Desktop positioning logic
    let position: {
      top?: string;
      bottom?: string;
      left?: string;
      right?: string;
      transform?: string;
      maxHeight?: string;
      overflowY?: "auto" | "scroll" | "hidden" | "visible";
      "data-placement"?: string;
    } = {};

    if (placement === "auto") {
      // Calculate available space in vertical directions
      const spaceAbove = rect.top;
      const spaceBelow = viewportHeight - rect.bottom;

      // Determine vertical position
      if (spaceBelow >= modalHeight + padding) {
        // Prefer below
        position.top = `${rect.bottom + padding}px`;
      } else if (spaceAbove >= modalHeight + padding) {
        // Try above - use bottom positioning for proper alignment
        position.bottom = `${viewportHeight - rect.top + padding}px`;
      } else {
        // Center vertically in the available space
        const availableHeight = Math.max(spaceAbove, spaceBelow);
        if (spaceBelow >= spaceAbove) {
          position.top = `${rect.bottom + padding}px`;
          if (modalHeight > availableHeight) {
            position.maxHeight = `${availableHeight - padding * 2}px`;
            position.overflowY = "auto";
          }
        } else {
          position.bottom = `${viewportHeight - rect.top - padding}px`;
          if (modalHeight > availableHeight) {
            position.maxHeight = `${availableHeight - padding * 2}px`;
            position.overflowY = "auto";
          }
        }
      }

      // Determine horizontal position - center modal relative to input
      const inputCenterX = rect.left + rect.width / 2;
      const modalHalfWidth = modalWidth / 2;
      const centeredLeft = inputCenterX - modalHalfWidth;
      const centeredRight = inputCenterX + modalHalfWidth;

      if (centeredLeft >= padding && centeredRight <= viewportWidth - padding) {
        // Center relative to input if it fits within viewport with padding
        position.left = `${centeredLeft}px`;
      } else if (centeredRight > viewportWidth - padding) {
        // Modal would overflow right, align to right edge with padding
        position.right = `${padding}px`;
      } else if (centeredLeft < padding) {
        // Modal would overflow left, align to left edge with padding
        position.left = `${padding}px`;
      } else {
        // Fallback: center in viewport
        position.left = "50%";
        position.transform = "translateX(-50%)";
      }
    } else {
      switch (placement) {
        case "top":
          position.bottom = `${viewportHeight - rect.top}px`;
          position.left = `${rect.left}px`;
          position["data-placement"] = "top";
          break;
        case "bottom":
          position.top = `${rect.bottom}px`;
          position.left = `${rect.left}px`;
          position["data-placement"] = "bottom";
          break;
        case "left":
          position.top = `${rect.top}px`;
          position.right = `${viewportWidth - rect.left}px`;
          position["data-placement"] = "left";
          break;
        case "right":
          position.top = `${rect.top}px`;
          position.left = `${rect.right}px`;
          position["data-placement"] = "right";
          break;
      }
    }

    setModalStyle({
      position: "fixed",
      ...position,
      zIndex,
    });
  };

  const showModalWithPosition = () => {
    if (disabled || readOnly) return;
    calculateModalPosition();
    setShowModal(true);
    setAnimateOut(false);
    onOpen?.();
  };

  const hideModal = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setShowModal(false);
      setAnimateOut(false);
      onClose?.();
    }, 200);
  };

  const handleClear = () => {
    setSelectedDates([]);
    onChange?.(null);
    hideModal();
  };

  const handleMonthChange = (date: Date) => {
    setCurrentDate(date);
    onMonthChange?.(date);
  };

  const handleYearChange = (date: Date) => {
    setCurrentDate(date);
    onYearChange?.(date);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        hideModal();
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
      // Lock body scroll when modal is open
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.body.style.overflow = originalOverflow;
      };
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);

  // Listen for external value changes
  useEffect(() => {
    if (value) {
      setSelectedDates(Array.isArray(value) ? value : [value]);
    }
  }, [value]);

  // Notify parent of default value on initial render if needed
  useEffect(() => {
    // If we have a default date selected (today) and no value was provided initially
    if (selectedDates.length > 0 && !value) {
      if (variant === "multi" || variant === "range") {
        onChange?.(selectedDates);
      } else {
        onChange?.(selectedDates[0]);
      }
    }
    // We want this to run only once on mount, hence the empty dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply theme styles
  const themeStyles = {
    "--primary-color": theme.primaryColor || "#7e6bf5",
    "--background-color": theme.backgroundColor || "#fff",
    "--text-color": theme.textColor || "#333",
    "--selected-text-color": theme.selectedTextColor || "#fff",
    "--today-color": theme.todayColor || "#e6e6e6",
    "--border-color": theme.borderColor || "#ddd",
    "--hover-color": theme.hoverColor || "#f0f0f0",
  } as React.CSSProperties;

  return (
    <div
      className={`${styles.container} ${className || ""}`}
      style={{ ...style, ...themeStyles }}
    >
      <input
        ref={inputRef}
        className={`${styles.dateInput} ${inputStyles.className || ""}`}
        style={inputStyles.style}
        value={getFormattedValue()}
        onClick={showModalWithPosition}
        readOnly
        disabled={disabled}
        placeholder={inputStyles.placeholder}
      />

      {showModal && (
        <div className={styles.modalBackdrop}>
          <div
            ref={modalRef}
            className={`${styles.modalContent} ${
              animateOut ? styles.slideOut : styles.slideIn
            }`}
            style={modalStyle}
          >
            <CalendarHeader
              currentDate={currentDate}
              onPrev={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1,
                    1,
                  ),
                )
              }
              onNext={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                    1,
                  ),
                )
              }
              onMonthChange={handleMonthChange}
              onYearChange={handleYearChange}
              yearRange={yearRange}
            />
            <CalendarGrid
              currentDate={currentDate}
              selectedDates={selectedDates}
              onSelectDate={handleDateSelect}
              minDate={minDate}
              maxDate={maxDate}
              isRange={variant === "range"}
              isMulti={variant === "multi"}
            />
            {variant === "time" && (
              <TimePicker
                hour={hour}
                minute={minute}
                isAM={isAM}
                setHour={setHour}
                setMinute={setMinute}
                setIsAM={setIsAM}
              />
            )}
            <div className={styles.actions}>
              {clearable && (
                <button onClick={handleClear} className={styles.clear}>
                  Clear
                </button>
              )}
              {(variant === "time" ||
                (variant === "range" && selectedDates.length === 2) ||
                variant === "multi") && (
                <button onClick={handleConfirm} className={styles.confirm}>
                  Confirm
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
