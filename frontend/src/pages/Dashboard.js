import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';
import StatsCards from '../components/StatsCards';
import api from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  // Fetch jobs and stats
  const fetchData = async () => {
    try {
      setLoading(true);
      const [jobsRes, statsRes] = await Promise.all([
        api.get('/api/jobs', { params: { search, status: statusFilter } }),
        api.get('/api/jobs/stats')
      ]);
      setJobs(jobsRes.data.jobs);
      setStats(statsRes.data.stats);
      setError('');
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, statusFilter]);

  // Handle job creation
  const handleAddJob = () => {
    setEditingJob(null);
    setShowModal(true);
  };

  // Handle job edit
  const handleEditJob = (job) => {
    setEditingJob(job);
    setShowModal(true);
  };

  // Handle job delete
  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job application?')) {
      return;
    }

    try {
      await api.delete(`/api/jobs/${jobId}`);
      fetchData();
    } catch (err) {
      setError('Failed to delete job. Please try again.');
    }
  };

  // Handle save from modal
  const handleSaveJob = async (jobData) => {
    try {
      if (editingJob) {
        // Update existing job
        await api.put(`/api/jobs/${editingJob._id}`, jobData);
      } else {
        // Create new job
        await api.post('/api/jobs', jobData);
      }
      setShowModal(false);
      setEditingJob(null);
      fetchData();
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to save job');
    }
  };

  return (
    <div className="dashboard">
      <Navbar />
      
      <main className="dashboard-main">
        <div className="dashboard-container">
          {/* Header */}
          <div className="dashboard-header">
            <h1 className="dashboard-title">Job Applications</h1>
            <button className="btn btn-primary" onClick={handleAddJob}>
              + Add Job
            </button>
          </div>

          {/* Stats Cards */}
          {stats && <StatsCards stats={stats} />}

          {/* Filters */}
          <div className="dashboard-filters">
            <div className="search-box">
              <input
                type="search"
                className="form-input"
                placeholder="Search by company or role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="filter-box">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Error Message */}
          {error && <div className="alert alert-error">{error}</div>}

          {/* Jobs List */}
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">&#128188;</div>
              <h3>No job applications yet</h3>
              <p>Start tracking your job search by adding your first application.</p>
              <button className="btn btn-primary" onClick={handleAddJob}>
                Add Your First Job
              </button>
            </div>
          ) : (
            <div className="jobs-grid">
              {jobs.map(job => (
                <JobCard
                  key={job._id}
                  job={job}
                  onEdit={handleEditJob}
                  onDelete={handleDeleteJob}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Job Modal */}
      {showModal && (
        <JobModal
          job={editingJob}
          onSave={handleSaveJob}
          onClose={() => {
            setShowModal(false);
            setEditingJob(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
