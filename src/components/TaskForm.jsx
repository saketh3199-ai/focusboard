import { useState } from "react";


function TaskForm({ task, onSave, onCancel })
{
  
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [status, setStatus] = useState(task ? task.status : "To do");
  const [priority, setPriority] = useState(task ? task.priority : "Medium");
  const [dueDate, setDueDate] = useState(task ? task.dueDate : "");
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) =>
  {
    
    event.preventDefault();

    const newErrors = {};

   
    if (title.trim() === "")
    {
      newErrors.title = "Task title is required";
    }

    if (dueDate === "")
    {
      newErrors.dueDate = "Due date is required";
    }

    setErrors(newErrors);

    // If there is any error, stop here and do not save.
    if (Object.keys(newErrors).length > 0)
    {
      return;
    }

    onSave({title: title.trim(),description: description.trim(),status: status,priority: priority,dueDate: dueDate});
  };

  const FormJsx =
  <form onSubmit={handleSubmit}>
    <h2>{task ? "Edit task" : "Create new task"}</h2>
    
    {/*Title section  */}
    <div>
      <label htmlFor="title">Task title *</label>
      <input id="title" type="text" placeholder="e.g. Update pricing page" value={title} onChange={(event) => setTitle(event.target.value)}/>
      {errors.title && <p>{errors.title}</p>}
    </div>

    {/* Description Section */}
    <div>
      <label htmlFor="description">Description</label>
      <textarea id="description" placeholder="Add notes about this task..." value={description} onChange={(event) => setDescription(event.target.value)}/>
    </div>


    {/* Status Section */}
    <div>
      <label htmlFor="status">Status</label>
      <select id="status" value={status} onChange={(event) => setStatus(event.target.value)}>
        <option value="To do">To do</option>
        <option value="In progress">In progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>

    {/* Priority Section */}
    <div>
      <label htmlFor="priority">Priority</label>
      <select id="priority" value={priority} onChange={(event) => setPriority(event.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>

    {/* Due date section */}
    <div>
      <label htmlFor="dueDate">Due date *</label>
      <input id="dueDate" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)}/>
      {errors.dueDate && <p>{errors.dueDate}</p>}
    </div>

    <button type="button" onClick={onCancel}>Cancel</button>
    <button type="submit">{task ? "Save changes" : "Create task"}</button>
  </form>

  return FormJsx
}

export default TaskForm;