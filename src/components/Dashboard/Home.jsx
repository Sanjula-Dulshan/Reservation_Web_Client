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
      {/* Header Section */}
      <header className="header">
        <i className="fas fa-train train-icon"></i>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Railway Seat Reservation</h1>
          <p>Your journey begins here</p>
        </div>
      </section>
      <main>
        <section className="traveler-section">
          <h2>Traveler Assistance</h2>
          <p>Assist travelers with their reservations.</p>
          <Link to="/travelers" className="btn btn-primary">
            Manage Travelers
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
