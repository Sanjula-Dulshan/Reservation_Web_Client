import React, { useState, useEffect } from "react";
import "./TravelerInquiry.css";
import { FaIdCard, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { BASE } from "../constants";
import Modal from "react-modal";

const TravelerInquiries = () => {
  const [users, setUsers] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [response, setresponse] = useState("");

  const openUpdateModal = (data) => {
    setIsUpdateModalOpen(true);
    setUpdateData(data); // Set the data to update
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleSave = () => {
    const updatedUserData = {
      name: updateData.name,
      email: updateData.email,
    };

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //update Status
  const updateStatus = (id) => {
    axios
      .patch(`${BASE}/api/user/active_deactive/${id}`)
      .then((res) => {
        // Display the modal
        setresponse(res.data);

        openModal();

        setTimeout(() => {
          closeModal();
        }, 3000);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              <button
                className="update-button"
                onClick={() => openUpdateModal(user)}
              >
                Update
              </button>
              <button className="delete-button">Delete</button>

              {/* Display Button Only for backOffice */}
              <button
                className={`${
                  user.isActive ? "status-button-two" : "status-button"
                }`}
                onClick={() => {
                  updateStatus(user.nic);
                }}
              >
                {user.isActive ? "Active" : "Inactive"}
              </button>
              {/* **** */}
            </div>
          </div>
        ))}
        <Modal isOpen={isUpdateModalOpen} onRequestClose={closeUpdateModal}>
          <h2>Update User</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={updateData.name}
                onChange={(e) =>
                  setUpdateData({ ...updateData, name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={updateData.email}
                onChange={(e) =>
                  setUpdateData({ ...updateData, email: e.target.value })
                }
              />
            </div>
            {/* Add other form fields */}
            <div className="button-container">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save
              </button>

              <button className="btn btn-danger" onClick={closeUpdateModal}>
                Cancel
              </button>
            </div>
          </form>
        </Modal>
        {/* Modal for success */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="success-modal"
        >
          <div className="modal-content">
            <h2>{response}</h2>
            <p></p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default TravelerInquiries;
