import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/KMRL-logo-300x165.png'; // Make sure the path is correct
import './Navbar.css'; // We will update this file

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
              <a href="/departments" className="nav-link">
                Browse by Department
              </a>
            </li>
            <li className="nav-item">
              <a href="/priority" className="nav-link">
                Priority Queue
              </a>
            </li>
            <li className="nav-item">
              <a href="/deadlines" className="nav-link">
                Upcoming Deadlines
              </a>
            </li>
          </div>
          {/* Sign In button is separate for distinct styling */}
          <li className="nav-item-button">
            <a href="/login" className="nav-link-button">
              Sign In
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;