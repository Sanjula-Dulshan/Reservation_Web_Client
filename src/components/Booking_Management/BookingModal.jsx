import React, { useState } from "react";
import Modal from "react-modal";
import "./BookingModal.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE } from "../constants";
import { getTimeFromISOString } from "../utils";

Modal.setAppElement("#root"); // For modal accessibility

const BookingModal = ({ isOpen, onRequestClose }) => {
  const [start, setStartStation] = useState("");
  const [end, setEndStation] = useState("");
  const [date, setDate] = useState("");
  const [noOfSeats, setNoOfSeats] = useState(1);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [seats, setSeats] = useState([]);

  const [nic, setNic] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const formattedStartTime = getTimeFromISOString(startTime);
      const formattedEndTime = getTimeFromISOString(endTime);
      const data = {
        start,
        end,
        date,
        noOfSeats,
        nic,
        ticketPrice,
        endTime,
        startTime,
        totalPrice,
        seats,
      };

      // URL of the API endpoint where you want to send the data
      const apiUrl = `${BASE}/api/train/search`;

      const response = await axios.post(apiUrl, data);

      if (response.status === 200) {
        console.log("Booking successful:", response.data);

        const trainListJSONString = JSON.stringify(response.data.trainList);

        console.log("Train List Query String:", trainListJSONString);
        navigate(
          `/availability?nic=${nic}&seats=${seats}&ticketPrice=${
            response.data.ticketPrice
          }&trainList=${encodeURIComponent(trainListJSONString)}&totalPrice=${
            response.data.totalPrice
          }`
        );
      } else {
        console.error("Booking failed:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
        <label>NIC</label>
        <input
          type="text"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
          className="input-field"
        />
        <label>Start Station:</label>
        <select
          value={start}
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
          value={end}
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
          value={noOfSeats}
          onChange={(e) => setNoOfSeats(e.target.value)}
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
