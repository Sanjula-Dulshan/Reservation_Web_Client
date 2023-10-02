import React, { useState } from "react";
import "./Confirmation.css";
import Modal from "react-modal";
import trainGif from "./train2.gif";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const PassengerInfo = () => {
  const steps = [
    { title: "Home", status: "completed" },
    { title: "Check Availability", status: "completed" },
    { title: "Confirmation", status: "active" },
    { title: "Ticket Summary", status: "disabled" },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const handleConfirmClick = () => {
    // Handle booking confirmation logic here

    // Display the modal
    openModal();

    // After a delay, close the modal (you can adjust the delay)
    setTimeout(() => {
      closeModal();
    }, 3000); // Close the modal after 3 seconds (adjust as needed)
  };
  return (
    <div>
      <div className="progress-container">
        {steps.map((step, index) => (
          <div key={index} className={`step ${step.status}`}>
            <div className={`circle ${step.status}`}>{index + 1}</div>
            <div className="step-title">{step.title}</div>
          </div>
        ))}
      </div>

      <div className="passenger-info">
        <div className="card">
          <div className="card-icon">
            <i className="fas fa-user"></i>
          </div>
          <div className="card-title">Passenger Information</div>
        </div>

        {/* Render the passenger modal */}
        {/* {isPassengerModalOpen && (
          <PassengerModal
            isOpen={isPassengerModalOpen}
            onRequestClose={closePassengerModal}
          />
        )} */}

        <div className="card">
          <div className="card2 summary-card">
            <div className="card-title">Summary</div>
            <div className="summary-content">
              <p>Train Name & No: 8057 Express Train</p>
              <p>Start Station: Matara</p>
              <p>End Station: Colombo Fort</p>
              <p>Departure Date:2023-10-17</p>
              <p>Time Start - End:05:56 - 09:29</p>
              <p>No of Passengers: 2</p>
              <p>Train Class Selected: Air Conditioned Saloon</p>
              <p>Price One Person:1400</p>
            </div>
          </div>
          <div className="total-price-section">
            <div className="total-price-title">Total Price</div>
            <div className="total-price">LKR 2800</div>
          </div>

          <div className="confirm-button">
            <button className="btn btn-primary" onClick={handleConfirmClick}>
              CONFIRM
            </button>
          </div>
          {/* Modal for booking success */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className="success-modal"
          >
            <div className="modal-content">
              <h2>Booking Successful!</h2>
              <img src={trainGif} alt="Success GIF" />

              <p>Your booking has been confirmed.</p>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default PassengerInfo;
