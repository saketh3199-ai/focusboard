
function ConfirmDialog({ title, message, onConfirm, onCancel })
{
  
  const handleKeyDown = (event) =>
  {
    if (event.key === "Escape")
    {
      onCancel();
    }
  };

  const ConfirmDialogJsx =
  <div role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-message" onKeyDown={handleKeyDown}>
    <h2 id="confirm-title">{title}</h2>
    <p id="confirm-message">{message}</p>
    <button type="button" autoFocus onClick={onCancel}>Cancel</button>
    <button type="button" onClick={onConfirm}>Delete</button>
  </div>

  return ConfirmDialogJsx
}

export default ConfirmDialog;