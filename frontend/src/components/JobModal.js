import React, { useState, useEffect } from 'react';
import './JobModal.css';

const JobModal = ({ job, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    appliedDate: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Populate form if editing
  useEffect(() => {
    if (job) {
      setFormData({
        company: job.company,
        role: job.role,
        status: job.status,
        appliedDate: new Date(job.appliedDate).toISOString().split('T')[0],
        notes: job.notes || ''
      });
    }
  }, [job]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate required fields
    if (!formData.company.trim() || !formData.role.trim()) {
      setError('Company and Role are required');
      setLoading(false);
      return;
    }

    try {
      await onSave(formData);
    } catch (err) {
      setError(err.message || 'Failed to save job');
    } finally {
      setLoading(false);
    }
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {job ? 'Edit Job Application' : 'Add Job Application'}
          </h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="company">Company *</label>
            <input
              type="text"
              id="company"
              name="company"
              className="form-input"
              placeholder="Enter company name"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="role">Role *</label>
            <input
              type="text"
              id="role"
              name="role"
              className="form-input"
              placeholder="Enter job role/title"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="appliedDate">Applied Date</label>
              <input
                type="date"
                id="appliedDate"
                name="appliedDate"
                className="form-input"
                value={formData.appliedDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              className="form-textarea"
              placeholder="Add any notes about this application..."
              value={formData.notes}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="modal-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : (job ? 'Update Job' : 'Add Job')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobModal;
