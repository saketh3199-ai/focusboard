import { Calendar, Check, Pencil, Trash2 } from "lucide-react";

// Turns "2026-11-22" into "Nov 22". The T00:00:00 avoids a time zone shift.
const formatDate = (dateString) =>
{
  const date = new Date(dateString + "T00:00:00");

  if (Number.isNaN(date.getTime()))
  {
    return dateString;
  }

  return date.toLocaleDateString("en-US",{month: "short",day: "numeric"});
};

// One task row. It shows a task and calls the functions it is given.
function TaskCard({ task, onEdit, onDelete, onStatusChange })
{
  const isCompleted = task.status === "Completed";

  const TaskCardJsx =
  <li className="task-card">
    {/* Status icon: a green tick when completed. The dropdown below is what changes the status. */}
    <span className={isCompleted ? "task-card__check task-card__check--done" : "task-card__check"} aria-hidden="true">{isCompleted && <Check/>}</span>

    <div className="task-card__info">
      <p className="task-card__title">{task.title}</p>
      <p className="task-card__description">{task.description}</p>
    </div>

    <div className="task-card__meta">
      <span className="pill pill--category">{task.category}</span>
      <span className={"pill pill--" + task.priority.toLowerCase()}>{task.priority}</span>
      <span className="task-card__date"><Calendar aria-hidden="true"/>{formatDate(task.dueDate)}</span>
    </div>

    <div className="task-card__actions">
      <select className="status-select" aria-label={"Change status of " + task.title} value={task.status} onChange={(event) => onStatusChange(task.id, event.target.value)}>
        <option value="To do">To do</option>
        <option value="In progress">In progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="button" className="icon-button" aria-label={"Edit " + task.title} onClick={() => onEdit(task)}><Pencil aria-hidden="true"/></button>
      <button type="button" className="icon-button" aria-label={"Delete " + task.title} onClick={() => onDelete(task)}><Trash2 aria-hidden="true"/></button>
    </div>
  </li>

  return TaskCardJsx
}

export default TaskCard;