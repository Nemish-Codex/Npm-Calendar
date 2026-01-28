import { useState } from "react";
import "./App.css";
import { Calendar } from "./components/Calendar/Calendar";
import { CalendarVariant } from "./components/Calendar/types";

const variants: {
  id: CalendarVariant;
  title: string;
  description: string;
  icon: string;
  gradient: string;
}[] = [
  {
    id: "default",
    title: "Default Calendar",
    description:
      "Clean and simple single date selection with intuitive navigation",
    icon: "📅",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: "time",
    title: "DateTime Picker",
    description:
      "Select both date and time with precision hour and minute controls",
    icon: "⏰",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: "range",
    title: "Date Range",
    description: "Select a start and end date with interactive range preview",
    icon: "📆",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: "multi",
    title: "Multi-Select",
    description:
      "Select multiple individual dates for flexible scheduling needs",
    icon: "✨",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
];

function App() {
  const [activeVariant, setActiveVariant] =
    useState<CalendarVariant>("default");

  const calendarProps = {
    placement: "auto" as const,
    format: "dd/m/yy",
    onChange: (e: any) => console.log("Selected:", e),
    theme: {
      primaryColor: "#7e6bf5",
      backgroundColor: "#fff",
      textColor: "#333",
      selectedTextColor: "#fff",
      todayColor: "#e6e6e6",
    },
  };

  return (
    <div className="app-container">
      {/* Animated Background */}
      <div className="bg-gradient"></div>
      <div className="bg-pattern"></div>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-badge">
          <span className="badge-icon">📦</span>
          <span>npm package</span>
        </div>
        <h1 className="hero-title">
          <span className="title-gradient">React Calendar</span>
          <span className="title-secondary">Component</span>
        </h1>
        <p className="hero-subtitle">
          A beautiful, customizable, and feature-rich calendar component for
          React applications. Built with TypeScript and zero dependencies.
        </p>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">4</span>
            <span className="stat-label">Variants</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-value">100%</span>
            <span className="stat-label">TypeScript</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-value">0</span>
            <span className="stat-label">Dependencies</span>
          </div>
        </div>
        <div className="hero-cta">
          <code className="install-command">
            <span className="command-prefix">$</span> npm install
            @codex/react-calendar
          </code>
          <button
            className="copy-btn"
            onClick={() =>
              navigator.clipboard.writeText("npm install @codex/react-calendar")
            }
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Variant Selector */}
      <section className="variants-section">
        <h2 className="section-title">Choose Your Variant</h2>
        <p className="section-subtitle">Select a variant to see it in action</p>

        <div className="variant-cards">
          {variants.map((variant) => (
            <button
              key={variant.id}
              className={`variant-card ${activeVariant === variant.id ? "active" : ""}`}
              onClick={() => setActiveVariant(variant.id)}
            >
              <div
                className="card-glow"
                style={{ background: variant.gradient }}
              ></div>
              <div className="card-content">
                <span className="card-icon">{variant.icon}</span>
                <h3 className="card-title">{variant.title}</h3>
                <p className="card-description">{variant.description}</p>
              </div>
              {activeVariant === variant.id && (
                <div className="active-indicator">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Demo Section */}
      <section className="demo-section">
        <div className="demo-container">
          <div className="demo-info">
            <div
              className="demo-badge"
              style={{
                background: variants.find((v) => v.id === activeVariant)
                  ?.gradient,
              }}
            >
              {variants.find((v) => v.id === activeVariant)?.icon}
            </div>
            <h2 className="demo-title">
              {variants.find((v) => v.id === activeVariant)?.title}
            </h2>
            <p className="demo-description">
              {variants.find((v) => v.id === activeVariant)?.description}
            </p>

            <div className="feature-list">
              <div className="feature-item">
                <svg
                  className="feature-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Fully customizable themes</span>
              </div>
              <div className="feature-item">
                <svg
                  className="feature-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Keyboard navigation support</span>
              </div>
              <div className="feature-item">
                <svg
                  className="feature-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Responsive & mobile-friendly</span>
              </div>
              <div className="feature-item">
                <svg
                  className="feature-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Lightweight & performant</span>
              </div>
            </div>

            <div className="code-preview">
              <div className="code-header">
                <span className="code-dot red"></span>
                <span className="code-dot yellow"></span>
                <span className="code-dot green"></span>
                <span className="code-filename">App.tsx</span>
              </div>
              <pre className="code-content">
                {`import { Calendar } from '@codex/react-calendar';

<Calendar
  variant="${activeVariant}"
  format="dd/mm/yyyy"
  onChange={(date) => console.log(date)}
  theme={{
    primaryColor: "#7e6bf5",
    backgroundColor: "#fff"
  }}
/>`}
              </pre>
            </div>
          </div>

          <div className="demo-calendar">
            <div className="calendar-wrapper">
              <Calendar variant={activeVariant} {...calendarProps} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">
            Built with ❤️ by{" "}
            <span className="footer-highlight">Codex Team</span>
          </p>
          <p className="footer-note">
            Open the browser console to see selected values
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
