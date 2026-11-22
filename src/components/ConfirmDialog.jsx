// A reusable confirmation box. It only displays text and calls the functions it is given.
function ConfirmDialog({ title, message, onConfirm, onCancel })
{
  // Pressing Escape cancels, so keyboard users can leave the dialog.
  const handleKeyDown = (event) =>
  {
    if (event.key === "Escape")
    {
      onCancel();
    }
  };

  const ConfirmDialogJsx =
  <div className="modal-overlay">
    <div className="modal modal--small" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-message" onKeyDown={handleKeyDown}>
      <h2 id="confirm-title" className="modal__title">{title}</h2>
      <p id="confirm-message" className="modal__message">{message}</p>
      <div className="modal__actions modal__actions--plain">
        <button type="button" className="btn btn--outline" autoFocus onClick={onCancel}>Cancel</button>
        <button type="button" className="btn btn--danger" onClick={onConfirm}>Delete</button>
      </div>
    </div>
  </div>

  return ConfirmDialogJsx
}

export default ConfirmDialog;