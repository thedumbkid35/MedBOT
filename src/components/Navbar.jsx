import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("profile");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1 className="logo">MedBOT</h1>
      <ul className="nav-links">
        <li><NavLink to="/home">Home</NavLink></li>
        <li><NavLink to="/recipes">Recipes</NavLink></li>
        <li><NavLink to="/remedies">Remedies</NavLink></li>
        <li><NavLink to="/bmi">BMI</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        <li><NavLink to="/about">About Us</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
