import { useState } from "react";

export default function RandomQuote() {
  const quotes = [
    "Code is like humor. When you have to explain it, it’s bad.",
    "First, solve the problem. Then, write the code.",
    "Practice makes a developer perfect.",
    "React makes UI predictable.",
    "Simple is better than complex."
  ];

  const [quote, setQuote] = useState(quotes[0]);

  return (
    <div className="card">
      <h2>Random Quote</h2>
      <p>{quote}</p>
      <button onClick={() => setQuote(quotes[Math.floor(Math.random() * quotes.length)])}>
        New Quote
      </button>
    </div>
  );
}
