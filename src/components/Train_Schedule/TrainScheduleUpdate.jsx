import { React, useState, useEffect } from "react";
import { BASE } from "../constants.js";

export default function TrainSchedule() {
  const [stationRows, setStationRows] = useState([
    { stationName: "", arrivalTime: "" },
  ]);

  const addRow = () => {
    setStationRows([...stationRows, { stationName: "", arrivalTime: "" }]);
  };

  const removeRow = (index) => {
    const updatedRows = [...stationRows];
    updatedRows.splice(index, 1);
    setStationRows(updatedRows);
  };

  //Get Train Schedule at the start
  //   useEffect(() => {
  //     getTrainSchedule();
  //   }, []);

  //   const getTrainSchedule = async () => {
  //     const response = await fetch(BASE + "/api/trainSchedule");
  //     const data = await response.json();
  //     console.log(data);
  //   };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mt-5">
            <div className="card-body">
              <h1 className="text-center">Update Train Schedule</h1>

              {/*Update Train Schedule Form  */}
              <form>
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
                {stationRows.map((row, index) => (
                  <div className="row mb-3" key={index}>
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor={`stationName-${index}`}
                        className="form-label"
                      >
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
                      <label
                        htmlFor={`arrivalTime-${index}`}
                        className="form-label"
                      >
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
