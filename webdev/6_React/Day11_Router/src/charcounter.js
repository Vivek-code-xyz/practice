import { useState } from "react";

export default function CharacterCounter() {
  const [text, setText] = useState("");

  return (
    <div className="card">
      <h2>Character Counter</h2>

      <textarea
        className="text-box"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <p className="value">{text.length} characters</p>
    </div>
  );
}
