import React, { useState } from "react";
import Modal from "react-modal";
import "./BookingModal.css";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root"); // Set the root element for accessibility

const BookingModal = ({ isOpen, onRequestClose }) => {
  const [startStation, setStartStation] = useState("");
  const [endStation, setEndStation] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSubmit = () => {
    // Handle the booking submission here (e.g., send a request to the server)
    // After successful booking, navigate to the available trains page
    navigate("/availability");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="booking-modal"
    >
      <div className="booking-header">
        <h2>Seat Booking</h2>
      </div>
      <div className="booking-form">
        <label>Start Station:</label>
        <select
          value={startStation}
          onChange={(e) => setStartStation(e.target.value)}
          className="input-field"
        >
          <option value="weligama">Weligama</option>
          <option value="galle">Galle</option>
          <option value="hikkaduwa">Hikkaduwa</option>
          <option value="ambalangoda">Ambalangoda</option>
          <option value="aluthgama">Aluthgama</option>
          <option value="kalutara">Kalutara</option>
          <option value="panadura">Panadura</option>
          <option value="moratuwa">Moratuwa</option>
          <option value="dehiwala">Dehiwala</option>
          <option value="fort">Colombo Fort</option>
        </select>

        <label>End Station:</label>
        <select
          value={endStation}
          onChange={(e) => setEndStation(e.target.value)}
          className="input-field"
        >
          <option value="weligama">Weligama</option>
          <option value="galle">Galle</option>
          <option value="hikkaduwa">Hikkaduwa</option>
          <option value="ambalangoda">Ambalangoda</option>
          <option value="aluthgama">Aluthgama</option>
          <option value="kalutara">Kalutara</option>
          <option value="panadura">Panadura</option>
          <option value="moratuwa">Moratuwa</option>
          <option value="dehiwala">Dehiwala</option>
          <option value="fort">Colombo Fort</option>
        </select>

        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input-field"
        />

        <label>Number of Passengers:</label>
        <input
          type="number"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          className="input-field"
        />

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Book Seat
        </button>
      </div>
    </Modal>
  );
};

export default BookingModal;
