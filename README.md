# Codex React Calendar

A modern, highly customizable, and lightweight calendar component for React applications. Built with TypeScript and zero dependencies.

![Calendar Preview](https://github.com/codex/react-calendar/raw/main/preview.png)

## Features

- 🎨 **4 Variants**: Default, DateTime Picker, Date Range, and Multi-Select
- 🌙 **Theme support**: Fully customizable colors and styles
- 📱 **Responsive**: Logic to position modal intelligently on all devices
- 🔒 **Scroll Lock**: improved UX by preventing background scrolling
- ⌨️ **TypeScript**: First-class type support
- 🪶 **Lightweight**: Zero runtime dependencies (peers: react, react-dom)
- 🧩 **Flexible**: Custom input rendering, validation, and localized formatting

## Installation

```bash
npm install codex-react-calendar
```

## Usage

### Basic Usage

```tsx
import { useState } from "react";
import { Calendar } from "codex-react-calendar";
import "codex-react-calendar/style.css";

function App() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <Calendar
      value={date}
      onChange={(newDate) => setDate(newDate as Date)}
      format="dd/mm/yyyy"
    />
  );
}
```

### Date Time Picker

```tsx
<Calendar
  variant="time"
  value={date}
  onChange={setDate}
  format="dd/mm/yyyy HH:MM:ss"
/>
```

### Date Range Picker

```tsx
const [range, setRange] = useState<Date[]>([]);

<Calendar
  variant="range"
  value={range}
  onChange={setRange} // Returns [startDate, endDate]
  minDate={new Date()}
  yearRange={[2024, 2030]}
/>;
```

### Multi-Select Dates

```tsx
const [dates, setDates] = useState<Date[]>([]);

<Calendar
  variant="multi"
  value={dates}
  onChange={setDates} // Returns array of selected dates
/>;
```

## Props

| Prop        | Type                                               | Default          | Description                        |
| ----------- | -------------------------------------------------- | ---------------- | ---------------------------------- |
| `variant`   | `'default' \| 'time' \| 'range' \| 'multi'`        | `'default'`      | The operating mode of the calendar |
| `value`     | `Date \| Date[] \| null`                           | `null`           | Controlled value state             |
| `onChange`  | `(value: Date \| Date[] \| null) => void`          | -                | Callback when value changes        |
| `format`    | `string`                                           | `'dd/mm/yyyy'`   | Date display format                |
| `theme`     | `CalendarTheme`                                    | (default styles) | Object to override colors          |
| `minDate`   | `Date`                                             | -                | Minimum selectable date            |
| `maxDate`   | `Date`                                             | -                | Maximum selectable date            |
| `disabled`  | `boolean`                                          | `false`          | Disable input and interaction      |
| `clearable` | `boolean`                                          | `true`           | Show clear button                  |
| `placement` | `'auto' \| 'top' \| 'bottom' \| 'left' \| 'right'` | `'auto'`         | Modal positioning preference       |

## Customization

You can customize the look and feel by passing a `theme` object:

```tsx
<Calendar
  theme={{
    primaryColor: "#7e6bf5",
    backgroundColor: "#ffffff",
    textColor: "#333333",
    todayColor: "#e6e6e6",
    hoverColor: "#f0f0f0",
  }}
/>
```

## License

MIT © Codex
