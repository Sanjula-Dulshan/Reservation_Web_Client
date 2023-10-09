import { React, useEffect, useState } from "react";
import "./AllTrainSchedules.css";
import { BiCurrentLocation } from "react-icons/bi";
import { TbLocationFilled } from "react-icons/tb";
import { IoIosTime } from "react-icons/io";
import { RiMapPinTimeFill } from "react-icons/ri";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE } from "../constants";
import Modal from "react-modal";

export default function All_Train_Schedules() {
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [response, setresponse] = useState("");

  //Get all train schedules
  useEffect(() => {
    axios
      .get(`${BASE}/api/train`)
      .then((res) => {
        setSchedules(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //Update Train Schedule with id
  const updateSchedule = (id) => {
    localStorage.setItem("selectedScheduleId", id);
    navigate("/updateschedule");
  };

  //update Status
  const updateStatus = (id) => {
    axios
      .patch(`${BASE}/api/train/updateStatus/${id}`)
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

  //Format the time
  function formatTime(timeString) {
    const date = new Date(timeString);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Handle midnight (0) as 12 AM
    const formattedMinutes = minutes.toString().padStart(2, "0"); // Ensure two-digit minutes

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  return (
    <div className="all-schedules-container">
      <h1 className="schedules-title">All Train Schedules</h1>
      <div className="title-and-button-container">
        <button
          className="btn btn-primary btn-sm add-schedule-button"
          onClick={() => navigate("/schedule")}
        >
          Add New Schedule
        </button>
      </div>
      <div className="schedule-cards">
        {schedules.map((schedule) => (
          <div className="schedule-card" key={schedule.id}>
            <div className="schedule-details">
              <h3 className="schedule-name">{schedule.trainName}</h3>
              <div className="row">
                <div className="col-md-6">
                  <p className="schedule-location">
                    <span className="icon">
                      <BiCurrentLocation />
                    </span>
                    <strong>Start :</strong>{" "}
                    {schedule.stations && schedule.stations.length > 0
                      ? schedule.stations[0].stationName
                      : "N/A"}
                  </p>
                </div>

                <div className="col-md-6">
                  <p className="schedule-location">
                    <span className="icon">
                      <TbLocationFilled />
                    </span>
                    <strong>End :</strong>{" "}
                    {schedule.stations && schedule.stations.length > 0
                      ? schedule.stations[schedule.stations.length - 1]
                          .stationName
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <p className="schedule-description">
                    <span className="icon">
                      <IoIosTime />
                    </span>
                    <strong>Departure Time:</strong>{" "}
                    {schedule.stations && schedule.stations.length > 0
                      ? formatTime(schedule.stations[0].time)
                      : "N/A"}
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="schedule-description">
                    <span className="icon">
                      <RiMapPinTimeFill />
                    </span>
                    <strong>Arrival Time:</strong>{" "}
                    {schedule.stations && schedule.stations.length > 0
                      ? formatTime(
                          schedule.stations[schedule.stations.length - 1].time
                        )
                      : "N/A"}
                  </p>
                </div>
              </div>
              <p className="schedule-description">
                <span className="icon">
                  <MdAirlineSeatReclineExtra />
                </span>
                <strong>Seat Count:</strong> {schedule.seatCount}
              </p>
            </div>
            <div className="row">
              <div className="col">
                <button
                  className="update-btn"
                  onClick={() => updateSchedule(schedule.id)}
                >
                  Update
                </button>
              </div>
              <div className="col">
                <button
                  className={`btn ${
                    schedule.isActive ? "btn-resolved" : "btn-pending"
                  }`}
                  onClick={() => {
                    updateStatus(schedule.id);
                  }}
                >
                  {schedule.isActive ? "Active" : "Inactive"}
                </button>
              </div>
            </div>
          </div>
        ))}
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
}
