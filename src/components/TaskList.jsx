import TaskCard from "./TaskCard";

// The list of rows, plus the message shown when nothing matches.
function TaskList({ tasks, onEdit, onDelete, onStatusChange })
{
  if (tasks.length === 0)
  {
    return <p>No tasks match your filters.</p>;
  }

  const TaskListJsx =
  <ul>
    {
      tasks.map
      (
        (task) =>
        (
          <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange}/>
        )
      )
    }
  </ul>

  return TaskListJsx
}

export default TaskList;