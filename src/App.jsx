import { useState, useEffect } from "react";
import { sampleTasks } from "./data/sampleTasks";
import TaskForm from "./components/TaskForm";
import StatCard from "./components/StatCard";
import SearchBar from "./components/SearchBar";
import FilterTabs from "./components/FilterTabs";
import ConfirmDialog from "./components/ConfirmDialog";
import FocusNotes from "./components/FocusNotes";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import { ListChecks, Clock, Check, TrendingUp } from "lucide-react";

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
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [taskToDelete, setTaskToDelete] = useState(null);

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

    const confirmDelete = () =>
    {
      deleteTask(taskToDelete.id);
      setTaskToDelete(null);
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

    const resetFilters = () =>
    {
      setSearchText("");
      setStatusFilter("All");
      setPriorityFilter("All");
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

    const visibleTasks = tasks.filter
    (
      (task) =>
      {
        const matchesSearch = task.title.toLowerCase().includes(searchText.trim().toLowerCase());
        const matchesStatus = statusFilter === "All" || task.status === statusFilter;
        const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
      }
    );

    const AppJsx = 
  <div className="app">
    <Sidebar/>

    <div className="app__body">
      <Header/>

      <main className="main">
        {/* Page heading */}
        <section className="page-heading">
          <div>
            <h1>Your work, in focus.</h1>
            <p className="page-heading__subtitle">Plan your day, stay organized, and celebrate small wins.</p>
          </div>
          <button type="button" className="btn btn--primary" onClick={openCreateForm}>New task</button>
        </section>

        {/* Focus Notes carousel */}
        <FocusNotes/>

        {/* Statistics */}
        <section className="stats" aria-label="Overview statistics">
          <StatCard title="Total tasks" value={totalTasks} note="Across all projects" icon={ListChecks} tone="purple"/>
          <StatCard title="In progress" value={inProgressTasks} note="Keep the momentum" icon={Clock} tone="blue"/>
          <StatCard title="Completed" value={completedTasks} note="Great work this week" icon={Check} tone="green"/>
          <StatCard title="Completion" value={completionPercent + "%"} note="Of all tasks" icon={TrendingUp} tone="orange"/>
        </section>

        {/* My tasks */}
         <section className="tasks-section" aria-label="My tasks">
          <div className="tasks-section__header">
            <div>
              <h2>My tasks</h2>
              <p className="tasks-section__subtitle">Manage and track everything in one place.</p>
            </div>
            <button type="button" className="btn btn--soft" onClick={resetFilters}>View all tasks</button>
          </div>

          <FilterTabs statusFilter={statusFilter} onStatusChange={setStatusFilter} priorityFilter={priorityFilter} onPriorityChange={setPriorityFilter} onReset={resetFilters} totalCount={totalTasks}>
            <SearchBar value={searchText} onChange={setSearchText}/>
          </FilterTabs>

          <TaskList tasks={visibleTasks} onEdit={openEditForm} onDelete={setTaskToDelete} onStatusChange={changeStatus}/>
        </section>
      </main>
    </div>

    {showForm && <TaskForm key={editingTask ? editingTask.id : "new"} task={editingTask} onSave={saveTask} onCancel={closeForm}/>}
    {taskToDelete && <ConfirmDialog title="Delete task" message={"This will remove \"" + taskToDelete.title + "\" from your tasks."} onConfirm={confirmDelete} onCancel={() => setTaskToDelete(null)}/>}
  </div>

  return AppJsx

  return AppJsx 
}

export default App;