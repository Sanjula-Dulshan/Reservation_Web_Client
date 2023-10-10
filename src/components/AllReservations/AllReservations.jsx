import React, { useState, useEffect } from "react";
import "./AllReservations.css";
import UpdateModal from "./UpdateModal";

import axios from "axios";
import { BASE } from "../constants";

const AllReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE}/api/reservation`)
      .then((response) => {
        const filteredReservation = response.data.filter(
          (reservation) => reservation.isAgent
        );

        setReservations(filteredReservation);

        console.log("Filtered Reservation:", filteredReservation);
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

  const openUpdateModal = (reservation) => {
    setSelectedReservation(reservation);

    setUpdateModalOpen(true);
  };

  // Function to save the updated noOfSeats and close the update modal
  const saveUpdatedNoOfSeats = (updatedNoOfSeats) => {
    // Check if there is a selected reservation
    if (selectedReservation) {
      // Define the reservation ID
      const reservationId = selectedReservation.id;
      console.log("id", reservationId); // Replace with the actual property name of the ID in your reservation object

      // Define the updated data with the new noOfSeats value
      const updatedData = {
        noOfSeats: updatedNoOfSeats,
      };

      // Make an API call to update the reservation's noOfSeats
      axios
        .put(`${BASE}/api/reservation/${reservationId}`, updatedData)
        .then((response) => {
          if (response.status === 200) {
            // Reservation updated successfully
            console.log("Reservation updated:", response.data);

            // Close the modal
            setUpdateModalOpen(false);

            // Optionally, update the selected reservation's noOfSeats in your state
            // ...
          } else {
            // Handle any errors or display an error message
            console.error("Reservation update failed:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error updating reservation:", error);
        });
    }
  };

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
                <strong>No of Seats :</strong> {reservation.noOfSeats}
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
              <button
                className="update-button"
                onClick={() => openUpdateModal(reservation)}
              >
                Update
              </button>
              <button className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
      {/* Update Modal */}
      {/* <Modal
        isOpen={isUpdateModalOpen}
        onRequestClose={() => setUpdateModalOpen(false)}
        className="modal-dialog"
      >
        <h2>Update No. of Seats</h2>
        <p>
          <strong>Current No. of Seats:</strong> {updatedNoOfSeats}
        </p>
        <label>New No. of Seats:</label>
        <input
          type="number"
          value={updatedNoOfSeats}
          onChange={(e) => setUpdatedNoOfSeats(e.target.value)}
        />
        <button onClick={saveUpdatedNoOfSeats}>Save</button>
      </Modal> */}

      <UpdateModal
        isOpen={isUpdateModalOpen}
        onRequestClose={() => setUpdateModalOpen(false)}
        initialNoOfSeats={
          selectedReservation ? selectedReservation.noOfSeats : 0
        }
        onSave={saveUpdatedNoOfSeats}
      />
    </div>
  );
};

export default AllReservations;
