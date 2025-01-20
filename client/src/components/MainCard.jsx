import { DOMAIN_NAME } from '../App';
import BinCreationModal from './BinCreationModal';
import { useState } from 'react';

function MainCard({ newRandomBinID }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    openModal();
  };
  return (
    <div className="main-card">
      <h1>Create New Bin</h1>
      <p>Create a New Bin to collect Requests</p>
      <form className="card-form" onSubmit={handleFormSubmit}>
        <label htmlFor="input-field">{DOMAIN_NAME}/</label>
        <input
          type="text"
          id="input-field"
          value={newRandomBinID || 'error'}
          disabled
        ></input>
        <button type="submit" className="card-button">
          Create
        </button>
        <BinCreationModal isOpen={isModalOpen} onClose={closeModal} />
      </form>
    </div>
  );
}

export default MainCard;
