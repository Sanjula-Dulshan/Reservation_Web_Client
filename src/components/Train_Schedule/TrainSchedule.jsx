import React from "react";

export default function TrainSchedule() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mt-5">
            <div className="card-body">
              <h1 className="text-center">Train Schedule</h1>

              {/* Add Train Schedule Form  */}
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
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="stationName" className="form-label">
                      Station Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="stationName"
                      placeholder="Enter Station Name"
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
                    />
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-success">
                    Add Schedule
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
