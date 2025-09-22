import React, { useState } from 'react';
import './login.css';
import heroimg from './assets/hero-img.png';
import Navbar from './components/Navbar';
// Import icons
import { FaUser, FaLock } from 'react-icons/fa';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        loginId: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.loginId) newErrors.loginId = "Login ID is required";
        if (!formData.password) {
            newErrors.password = "Password is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Login successful:', formData);
            alert('Logged in successfully!');
        } else {
            console.log('Form validation failed:', errors);
        }
    };

    return (
        <div className="login-page">
            {/* <Navbar /> */}
            <div className="login-container">
                <div className="login-card">
                    {/* Left Side: Image and Branding */}
                    <div
                        className="left-panel"
                        style={{ backgroundImage: `url(${heroimg})` }}
                    >
                        {/* The gradient overlay is now handled by CSS */}
                        <div className="branding-text">
                            <h2>Ride Green.</h2>
                            <p>Ride Metro.</p>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="right-panel">
                        <h2 className="form-title">Office Login</h2>
                        <p className="form-subtitle">
                            Welcome back! Please enter your credentials.
                        </p>

                        <form onSubmit={handleSubmit} noValidate>
                            <div className="form-group">
                                <label htmlFor="loginId">Login ID</label>
                                <div className="input-with-icon">
                                    <FaUser className="input-icon" />
                                    <input
                                        type="text"
                                        id="loginId"
                                        name="loginId"
                                        placeholder="Enter your Login ID"
                                        value={formData.loginId}
                                        onChange={handleChange}
                                        className={`form-input ${errors.loginId ? 'error' : ''}`}
                                    />
                                </div>
                                {errors.loginId && <p className="error-message">{errors.loginId}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="input-with-icon">
                                    <FaLock className="input-icon" />
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`form-input ${errors.password ? 'error' : ''}`}
                                    />
                                </div>
                                {errors.password && <p className="error-message">{errors.password}</p>}
                            </div>
                            
                            {/* "Forgot Password" link has been removed */}

                            <button type="submit" className="submit-button">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}