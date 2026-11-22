import { useState, useEffect } from "react";
import { sampleTasks } from "./data/sampleTasks";
import TaskForm from "./components/TaskForm";

const STORAGE_KEY = "focusboard_tasks";

function App() 
{
  
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

  
  const [showForm, setShowForm] = useState(false);

  
  const [editingTask, setEditingTask] = useState(null); 

  
  useEffect
  (
    () => 
    {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]
  );

  
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

  
  // 4. OPEN / CLOSE the form.
  const openCreateForm = () =>
  {
    setEditingTask(null);
    setShowForm(true);
  };

  const openEditForm = (task) =>
  {
    setEditingTask(task);
    setShowForm(true);
  };

  const closeForm = () =>
  {
    setEditingTask(null);
    setShowForm(false);
  };

  // 5. SAVE: update the existing task if editing, otherwise add a new one.
  const saveTask = (taskData) =>
  {
    if (editingTask)
    {
      setTasks
      (
        tasks.map
        (
          (task) =>
          {
            if (task.id === editingTask.id)
            {
              return {...task,...taskData};
            }
            return task;
          }
        )
      );
    }
    else
    {
      const newTask ={id: Date.now(),category: "General",...taskData};
      setTasks([newTask, ...tasks]);
    }

    closeForm();
  };

  const AppJsx = 
  <div>
    <h1>FocusBoard</h1>
    <p>{tasks.length} tasks loaded</p>
    <button onClick={openCreateForm}>New task</button>

    {showForm && <TaskForm key={editingTask ? editingTask.id : "new"} task={editingTask} onSave={saveTask} onCancel={closeForm} />}

    <ul>
    {
        tasks.map
      (
        (task) => 
        (
          <li key={task.id}>
            {task.title} - {task.status} - {task.priority} - {task.dueDate}
            <button onClick={() => openEditForm(task)}>Edit</button>
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