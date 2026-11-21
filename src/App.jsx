import { useState, useEffect } from "react";
import { sampleTasks } from "./data/sampleTasks";

const STORAGE_KEY = "focusboard_tasks";

function App() {
  // 1. LOAD: runs once when the app starts.
  // If tasks were saved before, use them. Otherwise use the sample tasks.
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : sampleTasks;
    } catch {
      return sampleTasks;
    }
  });

  // 2. SAVE: runs every time `tasks` changes.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <h1>FocusBoard</h1>
      <p>{tasks.length} tasks loaded</p>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;