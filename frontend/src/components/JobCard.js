import React from 'react';
import './JobCard.css';

const JobCard = ({ job, onEdit, onDelete }) => {
  // Format date to readable string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status class for styling
  const getStatusClass = (status) => {
    const statusMap = {
      'Applied': 'status-applied',
      'Interview': 'status-interview',
      'Offer': 'status-offer',
      'Rejected': 'status-rejected'
    };
    return statusMap[status] || 'status-applied';
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-company-info">
          <h3 className="job-company">{job.company}</h3>
          <p className="job-role">{job.role}</p>
        </div>
        <span className={`status-badge ${getStatusClass(job.status)}`}>
          {job.status}
        </span>
      </div>

      <div className="job-card-body">
        <div className="job-date">
          <span className="date-icon">&#128197;</span>
          Applied: {formatDate(job.appliedDate)}
        </div>
        {job.notes && (
          <p className="job-notes">{job.notes}</p>
        )}
      </div>

      <div className="job-card-footer">
        <button 
          className="btn btn-outline btn-sm"
          onClick={() => onEdit(job)}
        >
          Edit
        </button>
        <button 
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(job._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
