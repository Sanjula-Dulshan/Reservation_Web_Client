import React, { useState } from "react";
import "./Login.css";
import signUp from "./login.jpg";
import axios from "axios";
import { BASE } from "../constants";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const Registration = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/home");
  };
  const [formData, setFormData] = useState({
    // Initialize your form fields here

    password: "",
    nic: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data to be sent to the server
      const userData = {
        password: formData.password,
        nic: formData.nic,
      };

      // Make a POST request to the server
      const response = await axios.post(`${BASE}/api/user/login`, userData);

      // Check the response status
      if (response.status === 200) {
        console.log("User Login successful:", response.data);
        localStorage.setItem("email", formData.email);
        localStorage.setItem("nic", formData.nic);
        localStorage.setItem("isAgent", response.data.isAgent);
        localStorage.setItem(
          "isBackOffice_Current",
          response.data.isBackOffice
        );
        localStorage.setItem("isTraveler", response.data.isTraveler);

        console.log(localStorage.getItem("nic"));
        console.log(localStorage.getItem("isAgent"));
        console.log(localStorage.getItem("isBackOffice"));
        console.log(localStorage.getItem("isTraveler"));
        openModal();
      } else {
        console.error("User Login failed:", response.data);
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error:", error);
    }
  };

  // Define a function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="registration-image">
          <img src={signUp} alt="Register" />
        </div>
        <div className="registration-form">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nic">Nic</label>
              <input
                type="text"
                id="nic"
                name="nic"
                value={formData.nic}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <button type="submit">Login</button>
            </div>
          </form>
          {/* Modal */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Registration Success"
            className="modal-dialog"
            overlayClassName="modal-overlay"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registration Successful!</h5>
              </div>
              <div className="modal-body">
                <p>You can now log in.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Registration;
