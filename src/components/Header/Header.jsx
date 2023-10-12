import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <header className="header">
      <i className="fas fa-train train-icon"></i>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <a href="/" onClick={logout}>
          {" "}
          Logout
        </a>
      </nav>
    </header>
  );
};

export default Header;
