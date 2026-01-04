import { useState } from "react";

export default function BackgroundChanger() {
  const colors = ["#1abc9c", "#3498db", "#9b59b6", "#e74c3c", "#f1c40f", "#e67e22", "#2ecc71"];
  const [bg, setBg] = useState("#1abc9c");

  return (
    <div className="card" style={{ backgroundColor: bg }}>
      <h2>Background Changer</h2>

      <div className="btn-group">
        {colors.map((color, index) => (
          <button key={index} onClick={() => setBg(color)}>
            Color {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
