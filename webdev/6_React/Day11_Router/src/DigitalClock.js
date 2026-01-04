import { useEffect, useState } from "react";

export default function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="card">
      <h2>Digital Clock</h2>
      <p className="value">{time.toLocaleTimeString()}</p>
    </div>
  );
}
