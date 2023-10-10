import React, { useState } from "react";
import Modal from "react-modal";
import "./UpdateModal.css";

const UpdateModal = ({ isOpen, onRequestClose, initialNoOfSeats, onSave }) => {
  const [updatedNoOfSeats, setUpdatedNoOfSeats] = useState(initialNoOfSeats);

  const handleSave = () => {
    onSave(updatedNoOfSeats);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-popup"
    >
      <h2>Update No. of Seats</h2>
      <p>
        <strong>Current No of Seats:</strong> {initialNoOfSeats}
      </p>
      <label>New No. of Seats:</label>
      <input
        type="number"
        value={updatedNoOfSeats}
        onChange={(e) => setUpdatedNoOfSeats(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </Modal>
  );
};

export default UpdateModal;
