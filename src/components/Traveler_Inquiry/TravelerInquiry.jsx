import React, { useState, useEffect } from "react";
import "./TravelerInquiry.css";
import { FaCalendarAlt, FaPhone, FaInfoCircle } from "react-icons/fa"; // Import icons

const TravelerInquiries = () => {
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      name: "John Doe",
      date: "2023-10-15",
      description: "I have a question about my upcoming trip.",
      telephone: "+1234567890",
      pending: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      date: "2023-10-14",
      description: "Can you help me with my reservation?",
      telephone: "+9876543210",
      pending: false,
    },
    {
      id: 3,
      name: "Alice Johnson",
      date: "2023-10-13",
      description: "I need assistance with my booking.",
      telephone: "+1112223333",
      pending: true,
    },
    // Add more dummy inquiries as needed
  ]);

  useEffect(() => {
    // In a real application, you would fetch traveler inquiries from an API or database here
    // For this example, we initialize 'inquiries' with dummy data
  }, []);

  return (
    <div className="traveler-inquiries">
      <h1 className="inquiries-title">Traveler Inquiries</h1>
      <div className="inquiry-cards">
        {inquiries.map((inquiry) => (
          <div className="inquiry-card" key={inquiry.id}>
            <div className="inquiry-details">
              <h3 className="inquiry-name">{inquiry.name}</h3>
              <p className="inquiry-date">
                <span className="icon">
                  <FaCalendarAlt />
                </span>
                <strong>Date of Inquiry:</strong> {inquiry.date}
              </p>

              <p className="inquiry-telephone">
                <span className="icon">
                  <FaPhone />
                </span>
                <strong>Telephone:</strong> {inquiry.telephone}
              </p>
              <p className="inquiry-description">
                <span className="icon">
                  <FaInfoCircle />
                </span>
                <strong>Inquiry Description:</strong> {inquiry.description}
              </p>
            </div>
            <div className="inquiry-actions">
              <button
                className={`btn ${
                  inquiry.pending ? "btn-pending" : "btn-resolved"
                }`}
              >
                {inquiry.pending ? "Pending" : "Resolved"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelerInquiries;
