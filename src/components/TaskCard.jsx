// One task row. It shows a task and calls the functions it is given.
function TaskCard({ task, onEdit, onDelete, onStatusChange })
{
  const TaskCardJsx =
  <li>
    <div>
      <p>{task.title}</p>
      <p>{task.description}</p>
    </div>

    <span>{task.category}</span>
    <span>{task.priority}</span>
    <span>{task.dueDate}</span>

    <select aria-label={"Change status of " + task.title} value={task.status} onChange={(event) => onStatusChange(task.id, event.target.value)}>
      <option value="To do">To do</option>
      <option value="In progress">In progress</option>
      <option value="Completed">Completed</option>
    </select>

    <button type="button" onClick={() => onEdit(task)}>Edit</button>
    <button type="button" onClick={() => onDelete(task)}>Delete</button>
  </li>

  return TaskCardJsx
}

export default TaskCard;