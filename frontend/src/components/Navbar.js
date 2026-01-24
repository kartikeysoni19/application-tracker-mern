import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="navbar-brand">
          <span className="brand-icon">&#128188;</span>
          Job Tracker
        </Link>

        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <span className="navbar-user">
                Welcome, {user?.name || 'User'}
              </span>
              <button onClick={handleLogout} className="btn btn-outline navbar-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline navbar-btn">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary navbar-btn">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
