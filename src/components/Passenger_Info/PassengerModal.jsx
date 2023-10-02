import React, { useState } from "react";
import Modal from "react-modal";
import "./PassengerModal.css"; // Create a CSS file for this component
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root"); // Set the root element for accessibility

const PassengerModal = ({ isOpen, onRequestClose }) => {
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectType, setSelectType] = useState("");
  const [nic, setNic] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [otherPassengers, setOtherPassengers] = useState("");

  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSubmit = () => {
    // Handle the submission here (e.g., send a request to the server)
    // After successful submission, navigate to the next page
    navigate("/nextPage");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="passenger-modal"
    >
      <div className="passenger-header">
        <h2>Passenger Information</h2>
      </div>
      <div className="modal-content">
        <div className="passenger-form">
          <div className="input-field">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="input-field">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="input-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            <p className="info">
              You must provide a valid email address to receive ticket
              information via email.
            </p>
          </div>

          <div className="input-field">
            <label>Select Type</label>
            <select
              value={selectType}
              onChange={(e) => setSelectType(e.target.value)}
              className="input-field"
            >
              <option value="NIC">NIC</option>
              <option value="Passport">Passport</option>
            </select>
          </div>

          <div className="input-field">
            <label>NIC</label>
            <input
              type="text"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="input-field">
            <label>Mobile No</label>
            <input
              type="tel"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              className="input-field"
            />
            <p className="info">
              You must provide a valid mobile number, and ticket information
              will only be sent to local mobile numbers.
            </p>
          </div>

          <div className="input-field">
            <label>Other Passenger Info</label>
            <textarea
              value={otherPassengers}
              onChange={(e) => setOtherPassengers(e.target.value)}
              className="input-field"
            />
            <p className="info">
              Please enter details of all other passengers. If the passenger is
              below 17 years and does not have either a passport or NIC, please
              select the 'Dependent' category.
            </p>
          </div>
        </div>
        <div className="button-container">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button className="btn btn-danger" onClick={onRequestClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PassengerModal;
