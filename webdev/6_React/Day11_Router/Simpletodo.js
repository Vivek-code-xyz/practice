import { useState } from "react";

export default function SimpleTodo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask() {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  }

  return (
    <div className="card">
      <h2>Simple Todo</h2>

      <div className="todo-input">
        <input
          type="text"
          placeholder="New task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="todo-list">
        {tasks.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
