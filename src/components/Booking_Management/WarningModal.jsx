import React from "react";
import Modal from "react-modal";
import "./WarningModal.css";
import warningImage from "./warning.jpeg";

const WarningModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-dialog"
    >
      <img src={warningImage} alt="Warning" className="warning-image" />
      <p>Reservation date must be within 30 days from the booking date.</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default WarningModal;
