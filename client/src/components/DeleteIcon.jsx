import { useState } from 'react';
import Modal from './Modal';

function DeleteIcon({ onDelete }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDeleteModalOpen(true);
  };

  const closeModal = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDeleteModalOpen(false);
  };

  const handleDeleteBin = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (onDelete && typeof onDelete === 'function') {
      onDelete(); // Call the delete callback function
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <span className="deleteicon-span">
      <i
        id="deleteIcon"
        className="fas fa-trash delete-icon"
        onClick={handleDelete}
      ></i>
      <Modal isOpen={isDeleteModalOpen} onClose={closeModal}>
        {' '}
        <>
          <p>Are you sure? This will delete the Bin and all its Requets.</p>
          <div className="modal-buttons">
            <button
              className="card-button delete-btn"
              onClick={handleDeleteBin}
            >
              Delete Bin
            </button>
            <button className="card-button-alt" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </>
      </Modal>
    </span>
  );
}

export default DeleteIcon;
