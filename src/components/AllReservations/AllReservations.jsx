import React, { useState, useEffect } from "react";
import "./AllReservations.css";
import UpdateModal from "./UpdateModal";

import axios from "axios";
import { BASE } from "../constants";
import { Store, store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

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

  // Function to display an error notification
  const showErrorNotification = (message) => {
    Store.addNotification({
      title: "Error",
      message: message,
      type: "danger",
      container: "top-right",
      insert: "top",
      dismiss: { duration: 5000 },
    });
  };

  const saveUpdatedNoOfSeats = (updatedNoOfSeats) => {
    if (selectedReservation) {
      const reservationId = selectedReservation.id;

      // Define the maximum number of allowed seat updates (4 in this case)
      const maxAllowedSeatUpdates = 4;

      // Check if the updated number of seats is valid
      if (updatedNoOfSeats > maxAllowedSeatUpdates) {
        showErrorNotification(
          `You are not allowed to update the number of seats to more than ${maxAllowedSeatUpdates}.`
        );
        return;
      }

      // Convert the ISO 8601 date string to a Date object
      const reservationDate = new Date("2023-10-11T18:30:00.000+00:00");

      // Calculate the current date
      const currentDate = new Date();

      // Calculate the date 5 days before the reservation date
      const fiveDaysBeforeReservation = new Date(reservationDate);
      fiveDaysBeforeReservation.setDate(reservationDate.getDate() - 5);

      console.log(fiveDaysBeforeReservation);

      // Check if the current date is at least 5 days before the reservation date
      if (currentDate < fiveDaysBeforeReservation) {
        // Allow the update since it's at least 5 days before the reservation date
        console.log("You can update the reservation.");
      } else {
        // Display an error message
        console.log(
          "You are not allowed to update the reservation within 5 days of the reservation date."
        );
      }

      // Prepare the updated data
      const updatedData = {
        ...selectedReservation,
        noOfSeats: updatedNoOfSeats,
      };

      axios
        .put(`${BASE}/api/reservation/${reservationId}`, updatedData)
        .then((response) => {
          if (response.status === 200) {
            // Reservation updated successfully
            console.log("Reservation updated:", response.data);
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

  const cancelReservation = (reservation) => {
    const reservationId = reservation.train_Id;
    const currentDate = new Date();

    // Calculate the date 5 days before the reservation date
    const fiveDaysBeforeReservation = new Date(reservation.date);
    fiveDaysBeforeReservation.setDate(fiveDaysBeforeReservation.getDate() - 5);

    if (currentDate >= fiveDaysBeforeReservation) {
      Store.addNotification({
        title: "Cannot Cancel Reservation",
        message:
          "You can only cancel reservations at least 5 days before the reservation date.",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        type: "warning",
        insert: "top",
        container: "top-right",

        dismiss: {
          duration: 2500,
          onScreen: true,
          showIcon: true,
        },

        width: 400,
      });
    } else {
      axios
        .delete(`${BASE}/api/reservation/${reservationId}`)
        .then((response) => {
          if (response.status === 200) {
            Store.addNotification({
              title: "Reservation Cancelled",
              message: "The reservation has been cancelled.",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              type: "success",
              insert: "top",
              container: "top-right",

              dismiss: {
                duration: 2500,
                onScreen: true,
                showIcon: true,
              },

              width: 400,
            });

            // Reload reservations
            axios
              .get(`${BASE}/api/reservation`)
              .then((response) => {
                const filteredReservation = response.data.filter(
                  (r) => r.isAgent
                );

                setReservations(filteredReservation);
              })
              .catch((error) => {
                console.error("Error fetching reservations:", error);
              });
          } else {
            Store.addNotification({
              title: "Error",
              message:
                "Failed to cancel the reservation. Please try again later.",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              type: "danger",
              insert: "top",
              container: "top-right",

              dismiss: {
                duration: 2500,
                onScreen: true,
                showIcon: true,
              },

              width: 400,
            });
          }
        })
        .catch((error) => {
          console.error("Error cancelling reservation:", error);
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
              <button
                className="delete-button"
                onClick={() => cancelReservation(reservation)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

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
