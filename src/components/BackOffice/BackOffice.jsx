import React from "react";
import { Link } from "react-router-dom";

export default function BackOffice() {
  return (
    <div className="homepage">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Railway Seat Reservation</h1>
          <p>Your journey begins here</p>
        </div>
      </section>
      <main>
        <section className="traveler-section">
          <h2>Manage Train Schedules</h2>
          <p>Update train schedules.</p>
          <Link to="/allschedules" className="btn btn-primary">
            View All Schedules
          </Link>
        </section>

        <section className="traveler-section">
          <h2>Create Train Schedules</h2>
          <p>Add schedules for the trains</p>
          <Link to="/schedule" className="btn btn-primary">
            Add New Schedule
          </Link>
        </section>

        <section className="traveler-section">
          <h2>Traveler Assistance</h2>
          <p>Manage Traveler Account</p>
          <Link to="/travelers" className="btn btn-primary">
            Activate/Deactivate Travelers
          </Link>
        </section>
      </main>
    </div>
  );
}
