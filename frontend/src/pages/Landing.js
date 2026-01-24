import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './Landing.css';

const Landing = () => {
  const { isAuthenticated, loading } = useAuth();

  // Redirect to dashboard if already logged in
  if (!loading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="landing">
      <Navbar />
      
      <main className="landing-main">
        <div className="landing-container">
          <div className="landing-content">
            <h1 className="landing-title">
              Track Your Job Applications <span className="highlight">Effortlessly</span>
            </h1>
            <p className="landing-subtitle">
              Stay organized during your job search. Track applications, monitor progress, 
              and never miss an opportunity with our intuitive job application tracker.
            </p>
            <div className="landing-buttons">
              <Link to="/register" className="btn btn-primary btn-lg">
                Get Started Free
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg">
                Sign In
              </Link>
            </div>
          </div>

          <div className="landing-features">
            <div className="feature-card">
              <div className="feature-icon">&#128203;</div>
              <h3>Track Applications</h3>
              <p>Keep all your job applications organized in one place with status tracking.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">&#128202;</div>
              <h3>View Statistics</h3>
              <p>Get insights with dashboard statistics showing your application progress.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">&#128269;</div>
              <h3>Search & Filter</h3>
              <p>Quickly find applications by company name, role, or status.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="landing-footer">
        <p>&copy; 2025 Job Tracker. Developed by Kartikey Soni.</p>
      </footer>
    </div>
  );
};

export default Landing;
