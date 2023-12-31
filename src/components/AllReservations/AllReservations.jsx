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

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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

      // Define the maximum number of allowed seat updates
      const maxAllowedSeatUpdates = 4;

      // Check if the updated number of seats is valid
      if (updatedNoOfSeats > maxAllowedSeatUpdates) {
        showErrorNotification(
          `You are not allowed to update the number of seats to more than ${maxAllowedSeatUpdates}.`
        );
        return;
      }

      const fiveDaysBeforeReservation = new Date(selectedReservation.date);
      const currentDate = new Date();

      // Calculate the time difference in milliseconds
      const timeDiff = currentDate - fiveDaysBeforeReservation;

      // Convert the time difference to days
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      console.log("Date Difference in Days:", daysDiff);

      // Check if the difference is greater than 5 days
      if (daysDiff < 5) {
        const updatedData = {
          ...selectedReservation,
          noOfSeats: updatedNoOfSeats,
        };

        axios
          .put(`${BASE}/api/reservation/${reservationId}`, updatedData)
          .then((response) => {
            if (response.status === 200) {
              // Reservation updated successfully
              Store.addNotification({
                title: "Reservation Updated",
                message: "The reservation has been updated successfully.",
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
              axios.get(`${BASE}/api/reservation`).then((response) => {
                const filteredReservation = response.data.filter(
                  (r) => r.isAgent
                );

                setReservations(filteredReservation);
              });
              console.log("Reservation updated:", response.data);
              setUpdateModalOpen(false);
            } else {
              // Handle any errors or display an error message
              console.error("Reservation update failed:", response.data);
            }
          })
          .catch((error) => {
            console.error("Error updating reservation:", error);
          });
      } else {
        // The difference is 5 days or less, not allowed to update
        showErrorNotification(
          "You are not allowed to update the number of seats after 5 days of the reservation date."
        );
      }
    }
  };

  const cancelReservation = (selectedReservation) => {
    const reservationId = selectedReservation.id;
    console.log("Selected Reservation:", reservationId);

    const fiveDaysBeforeReservation = new Date(selectedReservation.date);
    console.log("Five Days Before Reservation:", fiveDaysBeforeReservation);
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDiff = currentDate - fiveDaysBeforeReservation;

    // Convert the time difference to days
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    console.log("Date Difference in Days:", daysDiff);

    if (daysDiff > 5) {
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
                <strong>From Station : </strong>{" "}
                {capitalizeFirstLetter(reservation.fromStation)}
              </p>

              <p className="inquiry-telephone">
                <strong>To Station :</strong>{" "}
                {capitalizeFirstLetter(reservation.toStation)}
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
