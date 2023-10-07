import { React, useState } from "react";
import Modal from "react-modal";
import trainGif from "./train2.gif";
//import "./TrainSchedule.css";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { BASE } from "../constants";

export default function TrainSchedule() {
  const [stationRows, setStationRows] = useState([
    { stationName: "", arrivalTime: "" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addRow = () => {
    setStationRows([...stationRows, { stationName: "", arrivalTime: "" }]);
  };

  const removeRow = (index) => {
    const updatedRows = [...stationRows];
    updatedRows.splice(index, 1);
    setStationRows(updatedRows);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //Save Train Schedule
  const saveTrainSchedule = async (e) => {
    e.preventDefault();

    // const response = await fetch(BASE + "/api/trainSchedule", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     trainName: e.target.trainName.value,
    //     seatCount: e.target.seatCount.value,
    //     isActive: e.target.isActive.value,
    //     stations: stationRows,
    //   }),
    // });
    // const data = await response.json();

    // Display the modal
    openModal();

    // After a delay, close the modal (you can adjust the delay)
    setTimeout(() => {
      closeModal();
    }, 3000); // Close the modal after 3 seconds (adjust as needed)

    //console.log(data);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mt-5">
            <div className="card-body">
              <h1 className="text-center">Train Schedule</h1>

              {/* Add Train Schedule Form  */}
              <form onSubmit={saveTrainSchedule}>
                <br></br>
                <div className="mb-3">
                  <label htmlFor="trainName" className="form-label">
                    Train Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="trainName"
                    placeholder="Enter Train Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="seatCount" className="form-label">
                    Seat Count
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="seatCount"
                    placeholder="Enter Seat Count"
                    min="10"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="isActive" className="form-label">
                    Active Status
                  </label>
                  {/* Add Dropdown */}
                  <select className="form-control" id="isActive">
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
                {/* <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="stationName" className="form-label">
                      Station Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="stationName"
                      placeholder="Enter Station Name"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="arrivalTime" className="form-label">
                      Arrival Time
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="arrivalTime"
                      placeholder="Enter Arrival Time"
                      required
                    />
                  </div>
                </div> */}
                {stationRows.map((row, index) => (
                  <div className="row mb-3" key={index}>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="stationName" className="form-label">
                        Station Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Station Name"
                        required
                        value={row.stationName}
                        onChange={(e) => {
                          const updatedRows = [...stationRows];
                          updatedRows[index].stationName = e.target.value;
                          setStationRows(updatedRows);
                        }}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="arrivalTime" className="form-label">
                        Arrival Time
                      </label>
                      <input
                        type="time"
                        className="form-control"
                        placeholder="Enter Arrival Time"
                        required
                        value={row.arrivalTime}
                        onChange={(e) => {
                          const updatedRows = [...stationRows];
                          updatedRows[index].arrivalTime = e.target.value;
                          setStationRows(updatedRows);
                        }}
                      />
                    </div>
                    {index > 0 && (
                      <div className="col-md-2 mb-3">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => removeRow(index)}
                        >
                          Close
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  style={{ width: "180px", marginLeft: "0" }}
                  onClick={addRow}
                >
                  Add Station
                </button>
                <br></br> <br></br>
                <div className="text-center mt-2">
                  <button type="submit" className="btn btn-success mt-2">
                    Create Schedule
                  </button>
                </div>
              </form>

              {/* Modal for success */}
              <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="success-modal"
              >
                <div className="modal-content">
                  <h2>Success!</h2>
                  <img src={trainGif} alt="Success GIF" />

                  <p>Schedule Added Successfully.</p>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
