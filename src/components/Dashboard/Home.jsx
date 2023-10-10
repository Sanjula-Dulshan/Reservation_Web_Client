import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import BookingModal from "../Booking_Management/BookingModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const backoffice = localStorage.getItem("isBackOffice_current");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      {backoffice === "false" && (
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to Railway Seat Reservation</h1>
            <p>Your journey begins here</p>
          </div>
        </section>
      )}
      {backoffice === "true" && (
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to Railway Seat Reservation</h1>
            <p>Your journey begins here</p>
          </div>
        </section>
      )}
      <main>
        {backoffice === "false" && (
          <section className="traveler-section">
            <h2>Traveler Assistance</h2>
            <p>Assist travelers with their reservations.</p>
            <Link to="/travelers" className="btn btn-primary">
              Manage Travelers
            </Link>
          </section>
        )}
        {backoffice === "true" && (
          <section className="traveler-section">
            <h2>Manage Train Schedules</h2>
            <p>Update train schedules.</p>
            <Link to="/allschedules" className="btn btn-primary">
              View All Schedules
            </Link>
          </section>
        )}
        {backoffice === "false" && (
          <section className="traveler-section">
            <h2>Traveler Assistance</h2>
            <p>Create Traveler Account</p>
            <Link to="/register" className="btn btn-primary">
              Create Travelers
            </Link>
          </section>
        )}
        {backoffice === "true" && (
          <section className="traveler-section">
            <h2>Create Train Schedules</h2>
            <p>Add schedules for the trains</p>
            <Link to="/schedule" className="btn btn-primary">
              Add New Schedule
            </Link>
          </section>
        )}
        {backoffice === "false" && (
          <section className="traveler-section">
            <h2>Reservations</h2>
            <p>All Reservations</p>
            <Link to="/reservation" className="btn btn-primary">
              Manage Reservations
            </Link>
          </section>
        )}
        {backoffice === "true" && (
          <section className="traveler-section">
            <h2>Traveler Assistance</h2>
            <p>Manage Traveler Account</p>
            <Link to="/travelers" className="btn btn-primary">
              Activate/Deactivate Travelers
            </Link>
          </section>
        )}
        {backoffice === "false" && (
          <section className="booking-section">
            <h2>Booking Management</h2>
            <p>Manage your travelers' bookings efficiently.</p>
            <button onClick={openModal} className="btn btn-primary">
              Seat Book
            </button>
            <BookingModal isOpen={isModalOpen} onRequestClose={closeModal} />
          </section>
        )}
      </main>
    </div>
  );
}
