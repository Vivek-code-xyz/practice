import { useState } from "react";

export default function ToggleText() {
  const [show, setShow] = useState(true);

  return (
    <div className="card">
      <h2>Toggle Text</h2>
      {show && <p>This text can be toggled!</p>}
      <button onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
}
