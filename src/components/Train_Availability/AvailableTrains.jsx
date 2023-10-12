import React, { useState, useEffect } from "react";
import "./AvailableTrains.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";

const AvailableTrains = () => {
  const [selectedTrain, setSelectedTrain] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isRowSelected, setIsRowSelected] = useState(false);

  const formatTime = (timeString) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Date(timeString).toLocaleTimeString(undefined, options);
  };
  // Access the data from the URL parameters

  const nic = queryParams.get("nic");
  const ticketPrice = queryParams.get("ticketPrice");
  const totalPrice = queryParams.get("totalPrice");
  const seats = queryParams.get("seats");
  const date = queryParams.get("date");

  // Parse the trainList query parameter into an array
  const trainList = JSON.parse(queryParams.get("trainList"));
  trainList.push = {
    ticketPrice,
  };

  console.log("Train List new:", trainList);

  // Now you can use start, end, date, seats, and trainList in your component
  console.log("Nic:", nic);
  console.log("Ticket Price:", ticketPrice);
  console.log("Total Price:", totalPrice);
  console.log("Seats:", seats);
  console.log("Train List:", trainList);
  console.log("Date:", date);

  const steps = [
    "Home",
    "Check Availability",
    "Confirmation",

    "Ticket Summary",
  ];

  // const handleTrainClick = (train) => {
  //   if (selectedTrain === train) {
  //     // If the clicked row is already selected, unselect it
  //     setSelectedTrain(null);
  //   } else {
  //     setSelectedTrain(train); // Otherwise, select the clicked row
  //   }
  // };
  const handleTrainClick = (train) => {
    setSelectedTrain(train);
    setSelectedRow(train);
    setIsRowSelected(true); // Enable the button when a row is clicked
  };

  const handleProceedClick = () => {
    if (selectedRow) {
      // Build the URL with query parameters
      const nextUrl = `/confirmation?trainId=${selectedRow.trainId}&trainName=${selectedRow.trainName}&startTime=${selectedRow.startTime}&endTime=${selectedRow.endTime}&noOfSeats=
      ${selectedRow.noOfSeats}&nic=${nic}&ticketPrice=${ticketPrice}&totalPrice=${totalPrice}&start=${selectedRow.start}&end=${selectedRow.end}&seats=${seats}&date=${date}
      `;

      // Navigate to the next page with the data
      navigate(nextUrl);
    }
  };

  return (
    <div className="available-trains">
      <div className="progress-container">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${
              index === 0 ? "completed" : index === 1 ? "active" : "disabled"
            }`}
          >
            <div
              className={`circle ${
                index === 0 ? "completed" : index === 1 ? "active" : "disabled"
              }`}
            >
              {index + 1}
            </div>
            <div className="step-title">{step}</div>
          </div>
        ))}
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Train Name</th>
              <th>Departs</th>
              <th>Arrives</th>
              <th>Available Seats</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {trainList.map((train) => (
              <tr
                key={train.trainId}
                onClick={() => handleTrainClick(train)}
                className={selectedTrain === train ? "selected" : ""}
              >
                <td>{train.trainName}</td>
                <td>{formatTime(train.startTime)}</td>
                <td>{formatTime(train.endTime)}</td>
                <td>{train.noOfSeats}</td>
                <td>
                  <div className="proceed-button">
                    <button
                      className="btn btn-primary"
                      onClick={handleProceedClick}
                      disabled={!isRowSelected} // Disable the button when no row is selected
                    >
                      Proceed
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AvailableTrains;
