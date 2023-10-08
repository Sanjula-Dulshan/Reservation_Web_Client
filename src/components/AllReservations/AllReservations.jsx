import React, { useState, useEffect } from "react";
import "./TravelerInquiry.css";
import { FaIdCard, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { BASE } from "../constants";
import Modal from "react-modal";

const AllReservations = () => {
  const [users, setUsers] = useState([]);

  axios
    .put(`${BASE}/api/user/${updateData.nic}`, updatedUserData)
    .then((response) => {
      console.log("User updated:", response.data);
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
};

useEffect(() => {
  axios
    .get(`${BASE}/api/user`)
    .then((response) => {
      const filteredUsers = response.data.filter(
        (user) => user.isTraveler && user.isAgent
      );

      setUsers(filteredUsers);
      console.log("Filtered Users:", filteredUsers);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
}, []);

return (
  <div className="traveler-inquiries">
    <h1 className="inquiries-title">Traveler Profiles</h1>
    <div className="inquiry-cards">
      {users.map((user, index) => (
        <div className="inquiry-card" key={index}>
          <div className="inquiry-details">
            <h3 className="inquiry-name">{user.name}</h3>
            <p className="inquiry-date">
              <span className="icon">
                <FaIdCard />
              </span>
              <strong>Nic:</strong> {user.nic}
            </p>

            <p className="inquiry-telephone">
              <span className="icon">
                <FaEnvelope />
              </span>
              <strong>Email:</strong> {user.email}
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

export default AllReservations;
