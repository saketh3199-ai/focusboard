import { useState, useEffect } from "react";
import { sampleTasks } from "./data/sampleTasks";
import TaskForm from "./components/TaskForm";
import StatCard from "./components/StatCard";
import SearchBar from "./components/SearchBar";

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



  // 6. STATUS: change only the status of one task.
  const changeStatus = (id, newStatus) =>
  {
    setTasks
    (
      tasks.map
      (
        (task) =>
        {
          if (task.id === id)
          {
            return {...task,status: newStatus};
          }
          return task;
        }
      )
    );
  };

  const totalTasks = tasks.length;

  const inProgressTasks = tasks.filter
  (
    (task) =>
    {
      return task.status === "In progress";
    }
  ).length;

  const completedTasks = tasks.filter
  (
    (task) =>
    {
      return task.status === "Completed";
    }
  ).length;


  const completionPercent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  // let completed tasks = 5 and totalTasks=10, then (5/10)*100 = 50



  const AppJsx = 
  <div>
    <h1>FocusBoard</h1>
    <div>
      <StatCard title="Total tasks" value={totalTasks} note="Across all projects"/>
      <StatCard title="In progress" value={inProgressTasks} note="Keep the momentum"/>
      <StatCard title="Completed" value={completedTasks} note="Great work this week"/>
      <StatCard title="Completion" value={completionPercent + "%"} note="Of all tasks"/>
    </div>

    <button onClick={openCreateForm}>New task</button>

    {showForm && <TaskForm key={editingTask ? editingTask.id : "new"} task={editingTask} onSave={saveTask} onCancel={closeForm} />}

    <ul>
    {
        tasks.map
        (
          (task) => 
          (
            <li key={task.id}>
              {task.title} - {task.priority} - {task.dueDate}
              <select aria-label={"Change status of " + task.title} value={task.status} onChange={(event) => changeStatus(task.id, event.target.value)}>
                <option value="To do">To do</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
              </select>
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