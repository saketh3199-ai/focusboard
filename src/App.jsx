import { useState, useEffect } from "react";
import { sampleTasks } from "./data/sampleTasks";

const STORAGE_KEY = "focusboard_tasks";

function App() 
{
  // 1. LOAD: runs once when the app starts.
  const [tasks, setTasks] = useState
  (
    () => 
    {
      try 
      {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : sampleTasks;
      } 
      catch 
      {
        return sampleTasks;
      }
    }
  );

  // 2. SAVE: runs every time `tasks` changes.
  useEffect
  (
    () => 
    {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]
  );

  // 3. DELETE: keep every task except the one with this id.
  const deleteTask = (id) =>
  {
    setTasks
    (
      tasks.filter
      (
        (task) =>
        {
          return task.id !== id;
        }
      )
    );
  };

  const AppJsx = 
  <div>
    <h1>FocusBoard</h1>
    <p>{tasks.length} tasks loaded</p>
    <ul>
    {
      tasks.map
      (
        (task) => 
        (
          <li key={task.id}>
            {task.title} - {task.status}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        )
      )
    }
    </ul>
  </div>

  return AppJsx 
}

export default App;