import React, { useState } from "react";
import "./Confirmation.css";
import Modal from "react-modal";
import trainGif from "./train2.gif";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE } from "../constants";

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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const trainId = queryParams.get("trainId");
  const trainName = queryParams.get("trainName");
  const startTime = queryParams.get("startTime");
  const endTime = queryParams.get("endTime");
  const noOfSeats = queryParams.get("seats");
  const ticketPrice = queryParams.get("ticketPrice");
  const totalPrice = queryParams.get("totalPrice");
  const userId = queryParams.get("nic");
  const fromStation = queryParams.get("start");
  const toStation = queryParams.get("end");
  const date = queryParams.get("date");

  const formatTime = (timeString) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Date(timeString).toLocaleTimeString(undefined, options);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const formattedStart = capitalizeFirstLetter(fromStation);
  const formattedEnd = capitalizeFirstLetter(toStation);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/home");
  };

  const handleConfirmClick = () => {
    const bookingData = {
      userId: userId,
      trainId: trainId,
      fromStation: fromStation,
      toStation: toStation,
      noOfSeats: parseInt(noOfSeats),
      totalPrice: parseInt(totalPrice),
      date: date,
      isAgent: true,
    };

    console.log("Booking Data:", bookingData);
    axios
      .post(`${BASE}/api/reservation`, bookingData)
      .then((response) => {
        if (response.status === 200) {
          // Reservation created successfully
          console.log("Reservation created:", response.data);

          // Display the modal
          openModal();

          // After a delay, close the modal (you can adjust the delay)
          setTimeout(() => {
            closeModal();
          }, 3000); // Close the modal after 3 seconds (adjust as needed)
        } else {
          // Handle any errors or display an error message
          console.error("Reservation creation failed:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error creating reservation:", error);
      });
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

        <div className="card">
          <div className="card2 summary-card">
            <div className="card-title">Summary</div>
            <div className="summary-content">
              <p>Train Name : {trainName}</p>
              <p>Start Station: {formattedStart}</p>
              <p>End Station: {formattedEnd}</p>

              <p>Time Start:{formatTime(startTime)}</p>
              <p>Time End:{formatTime(endTime)}</p>

              <p>Price One Person:{ticketPrice}</p>
            </div>
          </div>
          <div className="total-price-section">
            <div className="total-price-title">Total Price</div>
            <div className="total-price">{totalPrice}</div>
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
