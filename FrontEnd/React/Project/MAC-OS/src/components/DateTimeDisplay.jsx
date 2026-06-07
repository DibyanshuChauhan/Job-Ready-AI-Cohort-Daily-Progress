import { useState, useEffect } from "react";

const DateTimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the time every minute (60000ms)
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    // 1. Format the date parts (weekday, month, day)
    const dateOptions = { weekday: "short", month: "short", day: "numeric" };
    const dateParts = new Intl.DateTimeFormat(
      "en-US",
      dateOptions,
    ).formatToParts(date);

    // Extract and lowercase the weekday and month
    const weekday = dateParts
      .find((p) => p.type === "weekday")
      .value.toLowerCase();
    const month = dateParts.find((p) => p.type === "month").value.toLowerCase();
    const day = dateParts.find((p) => p.type === "day").value;

    // 2. Format the time parts (hour, minute, dayPeriod)
    const timeOptions = { hour: "numeric", minute: "2-digit", hour12: true };
    const timeParts = new Intl.DateTimeFormat(
      "en-US",
      timeOptions,
    ).formatToParts(date);

    const hour = timeParts.find((p) => p.type === "hour").value;
    const minute = timeParts.find((p) => p.type === "minute").value;
    const dayPeriod = timeParts.find((p) => p.type === "dayPeriod").value; // AM or PM

    // 3. Construct the final string with double spaces before the time as requested
    return `${weekday} ${month} ${day}  ${hour}:${minute} ${dayPeriod}`;
  };

  return (
    <div
      style={{ fontFamily: "monospace", fontSize: "1.2rem", fontWeight: "500" }}
    >
      {formatDateTime(currentTime)}
    </div>
  );
};

export default DateTimeDisplay;
