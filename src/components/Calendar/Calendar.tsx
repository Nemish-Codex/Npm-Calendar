import React, { useState, useRef, useEffect } from "react";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import { TimePicker } from "./TimePicker";
import styles from "./Calendar.module.css";

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [isAM, setIsAM] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [modalStyle, setModalStyle] = useState({});

  const handleConfirm = () => {
    if (selectedDate) {
      const fullDate = new Date(selectedDate);
      fullDate.setHours(isAM ? hour % 12 : (hour % 12) + 12);
      fullDate.setMinutes(minute);
      alert(`Confirmed: ${fullDate}`);
      hideModal();
    }
  };

  const formattedInput = selectedDate
    ? `${selectedDate.toDateString()} ${hour
        .toString()
        .padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${
        isAM ? "AM" : "PM"
      }`
    : "";

  const showModalWithPosition = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const modalWidth = 240; // Our new more compact width
      const modalHeight = 340; // Approximate height of compact calendar
      const padding = 8;

      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // For mobile devices, center in screen
      if (viewportWidth <= 768) {
        setModalStyle({});
        setShowModal(true);
        setAnimateOut(false);
        return;
      }

      // Calculate available space
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;

      // Determine vertical position
      let top;
      if (spaceBelow >= modalHeight + padding) {
        // Prefer below the input
        top = rect.bottom + window.scrollY + padding;
      } else if (spaceAbove >= modalHeight + padding) {
        // Try above if there's space
        top = rect.top + window.scrollY - modalHeight - padding;
      } else {
        // If no ideal space, position where most visible
        const centerY = rect.top + rect.height / 2;
        top = Math.max(
          padding + window.scrollY,
          Math.min(
            centerY - modalHeight / 2 + window.scrollY,
            viewportHeight - modalHeight - padding + window.scrollY
          )
        );
      }

      // Horizontal position - try to align with input field
      let left = rect.left;

      // Ensure calendar doesn't go off-screen horizontally
      if (left + modalWidth > viewportWidth - padding) {
        left = viewportWidth - modalWidth - padding;
      }
      if (left < padding) {
        left = padding;
      }

      setModalStyle({
        top: `${top}px`,
        left: `${left}px`,
      });
      setShowModal(true);
      setAnimateOut(false);
    }
  };

  const hideModal = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setShowModal(false);
      setAnimateOut(false);
    }, 200);
  };

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

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        className={styles.dateInput}
        value={formattedInput}
        onClick={showModalWithPosition}
        readOnly
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
                    1
                  )
                )
              }
              onNext={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                    1
                  )
                )
              }
            />
            <CalendarGrid
              currentDate={currentDate}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
            <TimePicker
              hour={hour}
              minute={minute}
              isAM={isAM}
              setHour={setHour}
              setMinute={setMinute}
              setIsAM={setIsAM}
            />
            <div className={styles.actions}>
              <button
                onClick={() => {
                  setSelectedDate(null);
                  hideModal();
                }}
                className={styles.clear}
              >
                Clear
              </button>
              <button onClick={handleConfirm} className={styles.confirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
