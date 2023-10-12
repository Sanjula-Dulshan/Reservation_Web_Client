import React, { useState, useEffect } from "react";
import "./TravelerInquiry.css";
import { FaIdCard, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { BASE } from "../constants";
import Modal from "react-modal";
import { Store, store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const TravelerInquiries = () => {
  const [users, setUsers] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [deletionConfirmation, setDeletionConfirmation] = useState(null);
  const [responses, setResponse] = useState("");
  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [response, setresponse] = useState("");
  const backoffice = localStorage.getItem("isBackOffice_current");

  const openUpdateModal = (data) => {
    setIsUpdateModalOpen(true);
    setUpdateData(data); // Set the data to update
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const updatedUserData = {
      ...users,
      name: updateData.name,
      email: updateData.email,
      isAgent: true,
    };

    console.log("Updated User Data:", updatedUserData);

    axios
      .put(`${BASE}/api/user/${updateData.nic}`, updatedUserData)
      .then((response) => {
        console.log("User updated:", response.data);

        fetchUsers();
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const deleteUser = (nic) => {
    // Set the confirmation for deletion
    setDeletionConfirmation({
      nic: nic,
      isConfirmed: false,
    });
  };

  const confirmDeletion = (nic) => {
    // Perform the deletion when confirmed
    axios
      .delete(`${BASE}/api/user/${nic}`)
      .then((res) => {
        Store.addNotification({
          title: `User with NIC ${nic} deleted successfully.`,

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

        // Refresh user data after deletion
        fetchUsers();

        setTimeout(() => {
          closeModal();
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        // Handle the error
      });

    // Close the deletion confirmation
    setDeletionConfirmation(null);
  };

  const fetchUsers = () => {
    axios
      .get(`${BASE}/api/user`)
      .then((responses) => {
        const filteredUsers = responses.data.filter(
          (user) => user.isTraveler && user.isAgent
        );
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  useEffect(() => {
    fetchUsers();
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
      <h1 className="inquiries-title-profile">Traveler Profiles</h1>
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
              <button
                className="delete-button"
                onClick={() => deleteUser(user.nic)}
              >
                Delete
              </button>

              {/* Display Button Only for backOffice */}
              {backoffice === "true" && (
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
              )}
              {/* **** */}
            </div>
          </div>
        ))}
        <Modal
          isOpen={isUpdateModalOpen}
          onRequestClose={closeUpdateModal}
          className="modal-profile"
        >
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
              <button type="submit" className="btn btn-primary">
                Save
              </button>

              <button className="btn btn-danger" onClick={closeUpdateModal}>
                Cancel
              </button>
            </div>
          </form>
        </Modal>
        {/* Deletion Confirmation Modal */}
        <Modal
          isOpen={deletionConfirmation !== null}
          onRequestClose={() => setDeletionConfirmation(null)}
          className="deletion-confirmation-modal"
        >
          <h2>Confirm Deletion</h2>
          <p>
            Are you sure you want to delete the user with NIC:{" "}
            {deletionConfirmation?.nic}?
          </p>
          <div className="button-container">
            <button
              className="btn btn-danger"
              onClick={() => confirmDeletion(deletionConfirmation?.nic)}
            >
              Confirm Deletion
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setDeletionConfirmation(null)}
            >
              Cancel
            </button>
          </div>
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
