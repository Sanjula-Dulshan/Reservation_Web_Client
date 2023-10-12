import React, { useState, useEffect } from "react";
import { BASE } from "../constants.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TrainSchedule() {
  const [stationRows, setStationRows] = useState([
    { stationName: "", arrivalTime: "" },
  ]);
  const [schedules, setSchedules] = useState({
    trainName: "",
    seatCount: 0,
    isActive: true,
    stations: [...stationRows],
  });
  const navigate = useNavigate();

  const [editedTimeValues, setEditedTimeValues] = useState(
    Array.from({ length: stationRows.length }, () => "")
  );

  const addRow = () => {
    setStationRows([...stationRows, { stationName: "", arrivalTime: "" }]);
  };

  const removeRow = (index) => {
    const updatedRows = [...stationRows];
    updatedRows.splice(index, 1);
    setStationRows(updatedRows);
  };

  //Format the time
  function formatTime(timeString) {
    const date = new Date(timeString);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  }

  useEffect(() => {
    const scheduleId = localStorage.getItem("selectedScheduleId");
    if (scheduleId) {
      axios
        .get(`${BASE}/api/train/${scheduleId}`)
        .then((res) => {
          const formattedStations = res.data.stations.map((station) => ({
            ...station,
            formattedArrivalTime: formatTime(station.time),
          }));
          setSchedules({
            ...res.data,
            stations: formattedStations,
          });
          setStationRows(formattedStations);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedRows = [...stationRows];
    updatedRows[index][name] = value;

    // Update the state with the selected time string
    if (name === "time") {
      const editedValues = [...editedTimeValues];
      editedValues[index] = value;
      setEditedTimeValues(editedValues);
    }

    setStationRows(updatedRows);
  };

  function isTimeFormat1(timeString) {
    const timeFormat1Regex = /^\d{2}:\d{2}$/;
    return timeFormat1Regex.test(timeString);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      //Convert time to ISO String
      const formattedStations = stationRows.map((row) => {
        let isoString;

        if (isTimeFormat1(row.time)) {
          const [time] = row.time.split(" ");
          let [hours, minutes] = time.split(":").map(Number);
          const period = row.time.split(" ")[1];

          // Adjust hours for PM
          if (period === "PM" && hours !== 12) {
            hours += 12;
          } else if (period === "AM" && hours === 12) {
            hours = 0;
          }

          const currentDate = new Date();
          currentDate.setHours(hours, minutes, 0, 0);

          const timezoneOffsetMs = currentDate.getTimezoneOffset() * 60 * 1000;

          isoString = new Date(currentDate - timezoneOffsetMs).toISOString();
        } else {
          // If the format is not "HH:mm", assume it's already in ISO format
          isoString = row.time;
        }

        return {
          stationName: row.stationName,
          time: isoString,
        };
      });

      const updatedSchedulesData = {
        id: schedules.id,
        trainName: schedules.trainName,
        isActive: schedules.isActive,
        seatCount: schedules.seatCount,
        stations: formattedStations,
      };
      const scheduleId = localStorage.getItem("selectedScheduleId");
      const apiUrl = `${BASE}/api/train/${scheduleId}`;

      const response = await axios.put(apiUrl, updatedSchedulesData);

      if (response.status === 204) {
        navigate("/allschedules");
      } else {
        alert("Update Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancel = () => {
    navigate("/allschedules");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mt-5">
            <div className="card-body">
              <h1 className="text-center">Update Train Schedule</h1>

              {/* Update Train Schedule Form */}
              <form onSubmit={handleFormSubmit}>
                <br></br>
                <div className="mb-3">
                  <label htmlFor="trainName" className="form-label">
                    Train Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="trainName"
                    name="trainName"
                    placeholder="Enter Train Name"
                    required
                    value={schedules.trainName}
                    onChange={(e) =>
                      setSchedules({ ...schedules, trainName: e.target.value })
                    }
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
                    name="seatCount"
                    placeholder="Enter Seat Count"
                    min="10"
                    required
                    value={schedules.seatCount}
                    onChange={(e) =>
                      setSchedules({ ...schedules, seatCount: e.target.value })
                    }
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
                    name="isActive"
                    value={schedules.isActive}
                    disabled
                    onChange={(e) =>
                      setSchedules({
                        ...schedules,
                        isActive: e.target.value === "true",
                      })
                    }
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
                {stationRows.map((row, index) => (
                  <div className="row mb-3" key={index}>
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor={`stationName-${index}`}
                        className="form-label"
                      >
                        Station Name
                      </label>
                      {/* <input
                        type="text"
                        className="form-control"
                        id={`stationName-${index}`}
                        name="stationName"
                        placeholder="Enter Station Name"
                        required
                        value={row.stationName}
                        onChange={(e) => handleInputChange(e, index)}
                      /> */}
                      <select
                        className="form-control"
                        id={`stationName-${index}`}
                        name="stationName"
                        placeholder="Enter Station Name"
                        required
                        value={row.stationName}
                        onChange={(e) => handleInputChange(e, index)}
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
                      <label
                        htmlFor={`arrivalTime-${index}`}
                        className="form-label"
                      >
                        Arrival Time
                      </label>
                      <input
                        type="time"
                        className="form-control"
                        id={`arrivalTime-${index}`}
                        name="time"
                        required
                        value={editedTimeValues[index] || formatTime(row.time)}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </div>
                    <div className="col-md-2 mb-3">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeRow(index)}
                      >
                        Close
                      </button>
                    </div>
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
                  <button type="submit" className="btn btn-success">
                    Update Schedule
                  </button>
                </div>
                <br></br>
              </form>
              <div className="text-center mt-2">
                <button className="btn btn-secondary" onClick={() => cancel()}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
