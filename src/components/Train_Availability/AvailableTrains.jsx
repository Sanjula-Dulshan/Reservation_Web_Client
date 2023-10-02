import React, { useState } from "react";
import "./AvailableTrains.css"; // Import the CSS file

const AvailableTrains = () => {
  const [selectedTrain, setSelectedTrain] = useState(null);
  const steps = [
    "Home",
    "Check Availability",
    "Confirmation",

    "Ticket Summary",
  ];

  const trains = [
    {
      id: 1,
      name: "Express Train 1",
      departs: "05:25",
      arrives: "09:00",
      availableSeats: 104,
      price: "LKR 1,600.00",
    },
    {
      id: 1,
      name: "Express Train 1",
      departs: "05:25",
      arrives: "09:00",
      availableSeats: 104,
      price: "LKR 1,600.00",
    },
  ];

  const handleTrainClick = (train) => {
    setSelectedTrain(train);
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
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {trains.map((train, index) => (
              <tr
                key={index}
                onClick={() => handleTrainClick(train)}
                className={selectedTrain === train ? "selected" : ""}
              >
                <td>{train.name}</td>
                <td>{train.departs}</td>
                <td>{train.arrives}</td>
                <td>{train.availableSeats}</td>
                <td>{train.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTrain && (
        <div className="proceed-button">
          <button className="btn btn-primary">Proceed</button>
        </div>
      )}
    </div>
  );
};

export default AvailableTrains;
