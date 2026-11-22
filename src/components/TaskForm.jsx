import { useState } from "react";
import { X } from "lucide-react";

// Props: task is null when creating, or the task being edited.
// onSave(taskData) is called when the form is valid, onCancel() closes the form.
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

  // Pressing Escape closes the form, so keyboard users can leave it.
  const handleKeyDown = (event) =>
  {
    if (event.key === "Escape")
    {
      onCancel();
    }
  };

  const FormJsx =
  <div className="modal-overlay">
    <form className="modal" role="dialog" aria-modal="true" aria-labelledby="form-title" onKeyDown={handleKeyDown} onSubmit={handleSubmit}>
      {/* Header */}
      <div className="modal__header">
        <div>
          <h2 id="form-title" className="modal__title">{task ? "Edit task" : "Create new task"}</h2>
          <p className="modal__subtitle">{task ? "Update your task details." : "Add your task details to stay on top of your work."}</p>
        </div>
        <button type="button" className="icon-button" aria-label="Close form" onClick={onCancel}><X aria-hidden="true"/></button>
      </div>

      {/* Title section */}
      <div className="field">
        <label htmlFor="title" className="field__label">Task title *</label>
        <input id="title" className={errors.title ? "input input--error" : "input"} type="text" placeholder="e.g. Update pricing page" autoFocus aria-invalid={errors.title ? "true" : "false"} value={title} onChange={(event) => setTitle(event.target.value)}/>
        {errors.title && <p className="field__error" role="alert">{errors.title}</p>}
      </div>

      {/* Description Section */}
      <div className="field">
        <label htmlFor="description" className="field__label">Description</label>
        <textarea id="description" className="input textarea" placeholder="Add notes about this task..." value={description} onChange={(event) => setDescription(event.target.value)}/>
      </div>

      {/* Status and priority side by side */}
      <div className="field-row">
        <div className="field">
          <label htmlFor="status" className="field__label">Status</label>
          <select id="status" className="input" value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="To do">To do</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="priority" className="field__label">Priority</label>
          <select id="priority" className="input" value={priority} onChange={(event) => setPriority(event.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Due date section */}
      <div className="field">
        <label htmlFor="dueDate" className="field__label">Due date *</label>
        <input id="dueDate" className={errors.dueDate ? "input input--error" : "input"} type="date" aria-invalid={errors.dueDate ? "true" : "false"} value={dueDate} onChange={(event) => setDueDate(event.target.value)}/>
        {errors.dueDate && <p className="field__error" role="alert">{errors.dueDate}</p>}
      </div>

      <p className="modal__required">* Required field</p>

      {/* Buttons */}
      <div className="modal__actions">
        <button type="button" className="btn btn--outline" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn--primary">{task ? "Save changes" : "Create task"}</button>
      </div>
    </form>
  </div>

  return FormJsx
}

export default TaskForm;