import { useState } from "react";
import { Outlet,Link } from "react-router";
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  return (
    <div className="page">
    <div className="sub-nav"><Link to="toggletext">Toggletext</Link></div>
    <div className={`card ${dark ? "dark-card" : ""}`}>
      <h2>Theme Toggle</h2>
      <p>{dark ? "Dark Mode Enabled 🌙" : "Light Mode Enabled ☀️"}</p>

      <button onClick={() => setDark(!dark)}>
        Toggle Theme
      </button>
    </div>
    <Outlet></Outlet>
    </div>
    
  );
}
