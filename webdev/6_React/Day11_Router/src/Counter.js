import { useState } from "react";
import ClickTracker from "./ClickTracker";
import { Outlet,Link } from "react-router";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="page">
      <div className="sub-nav">
        <Link to="clicktracker">Clicktracker</Link>
      </div>
    
      <Outlet></Outlet>
      <div className="card">
        <h2>Counter</h2>
        <p className="value">{count}</p>

        <div className="btn-group">
          <button onClick={() => setCount(count + 1)}>Increment</button>
          <button onClick={() => setCount(count - 1)}>Decrement</button>
          <button onClick={() => setCount(0)}>Clear</button>
        </div>
      </div>
    
    </div>
    
    
  );
}
