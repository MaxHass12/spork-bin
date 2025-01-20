import React, { useRef } from 'react';

const BinCreationModal = ({ isOpen, onClose }) => {
  const dialogRef = useRef(null);

  // Close the dialog when clicked outside
  const handleOutsideClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      className="modal"
      ref={dialogRef}
      open={isOpen}
      onClick={handleOutsideClick}
    >
      <div className="modal-content">
        <h2>Modal Title</h2>
        <p>This is a modal using the native dialog element.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </dialog>
  );
};

export default BinCreationModal;
