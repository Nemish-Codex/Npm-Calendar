import { useState } from "react";
import "./App.css";
import { Calendar } from "./components/Calendar/Calendar";
import { CalendarVariant } from "./components/Calendar/types";

function App() {
  const [selectedVariant, setSelectedVariant] =
    useState<CalendarVariant>("default");

  const handleVariantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVariant(event.target.value as CalendarVariant);
  };

  // Common calendar props
  const calendarProps = {
    placement: "auto" as const,
    format: "dd/m/yy",
    onChange: (e: any) => console.log(e),
    theme: {
      primaryColor: "#7e6bf5",
      backgroundColor: "#fff",
      textColor: "#333",
      selectedTextColor: "#fff",
      todayColor: "#e6e6e6",
    },
  };

  return (
    <div>
      <div
        style={{
          background: "#fff",
          borderRadius: "18px",
          boxShadow: "0 10px 30px rgba(44, 45, 90, 0.1)",
          padding: "2.5rem 2rem",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <h2 style={{ margin: "0 0 8px", fontSize: "24px", color: "#2a2a4a" }}>
            Calendar Component Demo
          </h2>
          <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
            Try different calendar variants
          </p>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <label
            htmlFor="variant-select"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: 500,
              fontSize: "15px",
              color: "#444",
            }}
          >
            Select Calendar Variant:
          </label>
          <select
            id="variant-select"
            value={selectedVariant}
            onChange={handleVariantChange}
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              appearance: "none",
              backgroundImage:
                'url(\'data:image/svg+xml;utf8,<svg fill="%23666" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>\')',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center",
            }}
          >
            <option value="default">Default</option>
            <option value="time">Time Picker</option>
            <option value="range">Date Range</option>
            <option value="multi">Multi-Select</option>
          </select>
        </div>

        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            backgroundColor: "#f8f9fd",
            borderRadius: "8px",
            borderLeft: "4px solid #7e6bf5",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "16px", color: "#444" }}>
            {selectedVariant === "default" && "Default Calendar"}
            {selectedVariant === "time" && "Time Picker Calendar"}
            {selectedVariant === "range" && "Date Range Calendar"}
            {selectedVariant === "multi" && "Multi-Select Calendar"}
          </h3>
          <p style={{ fontSize: "14px", color: "#666", margin: "8px 0 0" }}>
            {selectedVariant === "default" && "Select a single date"}
            {selectedVariant === "time" && "Select a date and time"}
            {selectedVariant === "range" &&
              "Select a date range - after selecting the first date, hover to see range preview"}
            {selectedVariant === "multi" &&
              "Select multiple dates by clicking them, click again to deselect"}
          </p>
        </div>

        <div style={{ padding: "10px 0" }}>
          <Calendar variant={selectedVariant} {...calendarProps} />
        </div>

        <div
          style={{
            marginTop: "25px",
            borderTop: "1px solid #eee",
            paddingTop: "15px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>
            Selected values will be logged to the browser console
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
