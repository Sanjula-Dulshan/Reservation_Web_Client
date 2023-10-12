import { React, useState } from "react";
import Modal from "react-modal";
import trainGif from "./train2.gif";
import axios from "axios";
import { BASE } from "../constants";

export default function TrainSchedule() {
  const [stations, setStations] = useState([
    { stationName: "", time: "" },
    { stationName: "", time: "" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trainName, setTrainName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [seatCount, setSeatCount] = useState(0);

  const addRow = () => {
    setStations([...stations, { stationName: "", time: "" }]);
  };

  const removeRow = (index) => {
    const updatedRows = [...stations];
    updatedRows.splice(index, 1);
    setStations(updatedRows);
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

    try {
      if (isActive === "true") {
        setIsActive(true);
      } else {
        setIsActive(false);
      }

      //Convert time to ISO String
      const formattedStations = stations.map((row) => {
        const [time] = row.time.split(" "); // Splitting "HH:mm AM/PM"
        let [hours, minutes] = time.split(":").map(Number);
        const period = row.time.split(" ")[1]; // AM or PM

        // Adjust hours for PM
        if (period === "PM" && hours !== 12) {
          hours += 12;
        } else if (period === "AM" && hours === 12) {
          hours = 0;
        }

        // Create a Date object with the current date and the parsed time
        const currentDate = new Date();
        currentDate.setHours(hours, minutes, 0, 0);

        // Get the timezone offset in minutes and convert it to milliseconds
        const timezoneOffsetMs = currentDate.getTimezoneOffset() * 60 * 1000;

        // Adjust the time to include the timezone offset
        const isoString = new Date(
          currentDate - timezoneOffsetMs
        ).toISOString();

        return {
          stationName: row.stationName,
          time: isoString,
        };
      });

      const data = {
        trainName,
        isActive,
        seatCount,
        stations: formattedStations,
      };

      const apiUrl = `${BASE}/api/train`;

      const response = await axios.post(apiUrl, data);

      if (response.status === 201) {
        // Display the modal
        openModal();

        setTimeout(() => {
          closeModal();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
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
                    value={trainName}
                    className="form-control"
                    id="trainName"
                    placeholder="Enter Train Name"
                    onChange={(e) => setTrainName(e.target.value)}
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
                    onChange={(e) => setSeatCount(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="isActive" className="form-label">
                    Active Status
                  </label>
                  {/* Add Dropdown */}
                  <select
                    className="form-control"
                    id="isActive"
                    value={isActive}
                    onChange={(e) => setIsActive(e.target.value)}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
                {stations.map((row, index) => (
                  <div className="row mb-3" key={index}>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="stationName" className="form-label">
                        Station Name
                      </label>
                      {/* <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Station Name"
                        required
                        value={row.stationName}
                        onChange={(e) => {
                          const updatedRows = [...stations];
                          updatedRows[index].stationName = e.target.value;
                          setStations(updatedRows);
                        }}
                      /> */}
                      <select
                        value={row.stationName}
                        onChange={(e) => {
                          const updatedRows = [...stations];
                          updatedRows[index].stationName = e.target.value;
                          setStations(updatedRows);
                        }}
                        className="input-field"
                      >
                        <option value="weligama">Weligama</option>
                        <option value="galle">Galle</option>
                        <option value="hikkaduwa">Hikkaduwa</option>
                        <option value="ambalangoda">Ambalangoda</option>
                        <option value="aluthgama">Aluthgama</option>
                        <option value="kalutara">Kalutara</option>
                        <option value="panadura">Panadura</option>
                        <option value="moratuwa">Moratuwa</option>
                        <option value="dehiwala">Dehiwala</option>
                        <option value="fort">Colombo Fort</option>
                      </select>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="time" className="form-label">
                        Arrival Time
                      </label>
                      <input
                        type="time"
                        className="form-control"
                        placeholder="Enter Arrival Time"
                        required
                        value={row.time}
                        onChange={(e) => {
                          const updatedRows = [...stations];
                          updatedRows[index].time = e.target.value;
                          setStations(updatedRows);
                        }}
                      />
                    </div>
                    {index > 1 && (
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
