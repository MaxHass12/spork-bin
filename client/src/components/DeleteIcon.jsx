function DeleteIcon({ onDelete }) {
  const handleDelete = (event) => {
    event.target.classList.add('deleted'); // Add feedback class
    setTimeout(() => {
      event.target.classList.remove('deleted'); // Remove feedback class after 1s
    }, 1000);

    if (onDelete && typeof onDelete === 'function') {
      onDelete(); // Call the delete callback function
    }
  };

  return (
    <span className="deleteicon-span">
      <i
        id="deleteIcon"
        className="fas fa-trash delete-icon"
        onClick={handleDelete}
      ></i>
    </span>
  );
}

export default DeleteIcon;
