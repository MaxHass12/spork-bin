import { DOMAIN_NAME } from '../App';
import BinCreationModal from './BinCreationModal';
import { useState } from 'react';
import { createNewBin } from '../service/bins.service';

function MainCard({ newRandomBinID, setBins, navigateToBin, navigateToHome }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewBinCreationSuccess, setIsNewBinCreationSuccess] = useState(null);

  const openModal = () => setIsModalOpen(true);

  const closeModal = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsModalOpen(false);
    setIsNewBinCreationSuccess(null);
    navigateToHome();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const newBinDetails = await createNewBin(newRandomBinID);
      setIsNewBinCreationSuccess(true);
      setBins((prev) => [...prev, newBinDetails]);
    } catch (err) {
      setIsNewBinCreationSuccess(false);
      console.log(err);
    }

    openModal();
  };

  const handleOpenBasket = (event) => {
    event.preventDefault();
    event.stopPropagation();

    console.log('BASKET WILL BE OPENED', newRandomBinID);
    navigateToBin(newRandomBinID);
  };

  const SuccessModalContent = () => {
    return (
      <>
        <p>Bin &quot;{newRandomBinID}&quot; is successfully created !</p>
        <div className="modal-buttons">
          <button className="card-button-alt" onClick={closeModal}>
            Close
          </button>
          <button className="card-button" onClick={handleOpenBasket}>
            Open Basket
          </button>
        </div>
      </>
    );
  };

  const ErrorModalContent = () => {
    return (
      <>
        <p>Error While Creating Bin</p>
        <div className="modal-buttons">
          <button className="card-button-alt" onClick={closeModal}>
            Close
          </button>
        </div>
      </>
    );
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
        <BinCreationModal isOpen={isModalOpen} onClose={closeModal}>
          {isNewBinCreationSuccess ? (
            <SuccessModalContent />
          ) : (
            <ErrorModalContent />
          )}
        </BinCreationModal>
      </form>
    </div>
  );
}

export default MainCard;
