// utils/dateFormatter.js

const DateFormatter = {
  // DD-MM-YYYY
  formatDate(dateInput = new Date()) {
    const date = new Date(dateInput);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  },

  // DD-MM-YYYY HH:MM
  formatDateTime(dateInput = new Date()) {
    const date = new Date(dateInput);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  },

  // 18 Mar 2026
  formatReadable(dateInput = new Date()) {
    const date = new Date(dateInput);

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  },

  // Only Time HH:MM:SS
  formatTime(dateInput = new Date()) {
    const date = new Date(dateInput);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  },
};

export default DateFormatter;