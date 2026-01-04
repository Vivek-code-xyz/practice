import { useState } from "react";

export default function ClickTracker() {
  const [clicks, setClicks] = useState(0);

  return (
    <div className="card">
      <h2>Click Tracker</h2>
      <p className="value">{clicks}</p>
      <button onClick={() => setClicks(clicks + 1)}>Click Me</button>
    </div>
  );
}
