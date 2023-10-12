import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import BookingModal from "../Booking_Management/BookingModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Railway Seat Reservation</h1>
          <p>Your journey begins here</p>
        </div>
      </section>
      <main>
        <section className="traveler-section">
          <h2>Travel Management</h2>
          <p>Manage travelers with their reservations.</p>
          <Link to="/travelers" className="btn btn-primary">
            Manage Travelers
          </Link>
        </section>
        <section className="traveler-section">
          <h2>Traveler Assistance</h2>
          <p>Create Traveler Account</p>
          <Link to="/register" className="btn btn-primary">
            Create Travelers
          </Link>
        </section>
        <section className="traveler-section">
          <h2>Reservations</h2>
          <p>All Reservations</p>
          <Link to="/reservations" className="btn btn-primary">
            Manage Reservations
          </Link>
        </section>
        <section className="booking-section">
          <h2>Booking Management</h2>
          <p>Manage your travelers' bookings efficiently.</p>
          <button onClick={openModal} className="btn btn-primary">
            Seat Book
          </button>
          <BookingModal isOpen={isModalOpen} onRequestClose={closeModal} />
        </section>
      </main>
    </div>
  );
}
