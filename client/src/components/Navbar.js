import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/KMRL-logo-300x165.png'; // Make sure the path is correct
import './Navbar.css'; // We will update this file
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and Brand Name */}
        <a href="/" className="navbar-brand">
          <img src={logo} alt="Doc Analyser Logo" className="navbar-logo" />
          <span className="brand-name">KMRL</span>
        </a>

        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation Menu */}
        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          {/* Main navigation links are wrapped for better spacing */}
          <div className="main-nav-links">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Analyse
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/departments" className="nav-link">
                Browse by Department
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/priority" className="nav-link">
                Priority Queue
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/deadlines" className="nav-link">
                Upcoming Deadlines
              </NavLink>
            </li>
          </div>
          <li className="nav-item">
            <NavLink to={"/login"} className="nav-link-button">
              Log Out
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;