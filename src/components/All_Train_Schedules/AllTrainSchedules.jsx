import { React, useEffect, useState } from "react";
import "./AllTrainSchedules.css";
import { BiCurrentLocation } from "react-icons/bi";
import { TbLocationFilled } from "react-icons/tb";
import { IoIosTime } from "react-icons/io";
import { RiMapPinTimeFill } from "react-icons/ri";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function All_Train_Schedules() {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      name: "Train 1",
      start: "Matara",
      end: "Colombo",
      seatCount: "1700",
      startTime: "10.00",
      endTime: "12.00",
      isActive: true,
    },
    {
      id: 2,
      name: "Train 2",
      start: "Matara",
      end: "Kandy",
      seatCount: "2500",
      startTime: "08.00",
      endTime: "13.00",
      isActive: false,
    },
    {
      id: 3,
      name: "Train 3",
      start: "Colombo",
      end: "Anuradhapura",
      seatCount: "1000",
      startTime: "12.00",
      endTime: "15.00",
      isActive: true,
    },
  ]);
  const navigate = useNavigate();

  //   useEffect(() => {

  //   }, []);

  //Update Train Schedule
  const updateSchedule = () => {
    console.log("Update Schedule");

    //Navigate to update schedule page with the schedule id
    navigate("/updateSchedule");
  };

  return (
    <div className="all-schedules-container">
      <h1 className="schedules-title">All Train Schedules</h1>
      <div className="schedule-cards">
        {schedules.map((schedule) => (
          <div className="schedule-card" key={schedule.id}>
            <div className="schedule-details">
              <h3 className="schedule-name">{schedule.name}</h3>
              <div className="row">
                <div className="col-md-6">
                  <p className="schedule-location">
                    <span className="icon">
                      <BiCurrentLocation />
                    </span>
                    <strong>Start :</strong> {schedule.start}
                  </p>
                </div>

                <div className="col-md-6">
                  <p className="schedule-location">
                    <span className="icon">
                      <TbLocationFilled />
                    </span>
                    <strong>End :</strong> {schedule.end}
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <p className="schedule-description">
                    <span className="icon">
                      <IoIosTime />
                    </span>
                    <strong>Departure Time:</strong> {schedule.startTime}
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="schedule-description">
                    <span className="icon">
                      <RiMapPinTimeFill />
                    </span>
                    <strong>Arrival Time:</strong> {schedule.endTime}
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
                <button className="update-btn" onClick={updateSchedule}>
                  Update
                </button>
              </div>
              <div className="col">
                <button
                  className={`btn ${
                    schedule.isActive ? "btn-resolved" : "btn-pending"
                  }`}
                >
                  {schedule.isActive ? "Active" : "Inactive"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
