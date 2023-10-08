import React, { useState, useEffect } from "react";
import "./AllReservations.css";
import { FaIdCard, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { BASE } from "../constants";
import Modal from "react-modal";

const AllReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE}/api/reservation`)
      .then((response) => {
        const filteredReservation = response.data.filter(
          (reservation) => reservation.isAgent
        );

        setReservations(filteredReservation);

        console.log("Filtered Reservation:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to filter reservations based on the search term
  const filteredReservations = reservations.filter((reservation) =>
    reservation.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="traveler-inquiries">
      <h1 className="inquiries-title">All Reservations</h1>
      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by NIC"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="inquiry-cards">
        {filteredReservations.map((reservation, index) => (
          <div className="inquiry-card" key={index}>
            <div className="inquiry-details">
              <h3 className="inquiry-name">{reservation.userId}</h3>
              <p className="inquiry-date">
                <strong>From Station : </strong> {reservation.fromStation}
              </p>

              <p className="inquiry-telephone">
                <strong>To Station :</strong> {reservation.toStation}
              </p>
              <p className="inquiry-telephone">
                <strong>Date</strong>{" "}
                {new Date(reservation.date).toLocaleDateString()}
              </p>

              <p className="inquiry-telephone">
                <strong>Total Price : </strong> Rs.{reservation.totalPrice}
              </p>
            </div>
            <div className="button-container">
              <button className="update-button">Update</button>
              <button className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReservations;
