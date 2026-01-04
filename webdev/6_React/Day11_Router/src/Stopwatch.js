import { useEffect, useState } from "react";
import { Outlet,Link } from "react-router";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="page">
           
      <div className="sub-nav"> <Link to="digitalclock">DigitalClock </Link></div>
      <div className="card">
        <h2>Stopwatch</h2>
        <p className="value">{(time / 100).toFixed(2)} s</p>

        <div className="btn-group">
          <button onClick={() => setRunning(true)}>Start</button>
          <button onClick={() => setRunning(false)}>Stop</button>
          <button onClick={() => { setTime(0); setRunning(false); }}>
            Reset
          </button>
        </div>
      </div>
      <Outlet/>
    </div>
  );
}
