import React, { useState } from "react";
import "./Confirmation.css";
import PassengerModal from "../Passenger_Info/PassengerModal";

const PassengerInfo = () => {
  const steps = [
    { title: "Home", status: "completed" },
    { title: "Check Availability", status: "completed" },
    { title: "Confirmation", status: "active" },
    { title: "Ticket Summary", status: "disabled" },
  ];
  const [isPassengerModalOpen, setIsPassengerModalOpen] = useState(false);

  // Function to open the passenger modal
  const openPassengerModal = () => {
    setIsPassengerModalOpen(true);
  };

  // Function to close the passenger modal
  const closePassengerModal = () => {
    setIsPassengerModalOpen(false);
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
            <button className="btn btn-primary">CONFIRM</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerInfo;
