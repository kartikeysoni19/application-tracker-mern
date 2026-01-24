const Job = require('../models/Job');

// @desc    Get all jobs for logged-in user
// @route   GET /api/jobs
// @access  Private
const getJobs = async (req, res) => {
  try {
    const { search, status } = req.query;
    
    // Build query - filter by user
    let query = { user: req.user._id };

    // Filter by status if provided
    if (status && status !== 'All') {
      query.status = status;
    }

    // Search by company or role
    if (search) {
      query.$or = [
        { company: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } }
      ];
    }

    // Get jobs sorted by applied date (newest first)
    const jobs = await Job.find(query).sort({ appliedDate: -1 });

    res.json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Private
const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if job belongs to user
    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this job' });
    }

    res.json({ success: true, job });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ message: 'Error fetching job' });
  }
};

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private
const createJob = async (req, res) => {
  try {
    const { company, role, status, appliedDate, notes } = req.body;

    // Validate required fields
    if (!company || !role) {
      return res.status(400).json({ message: 'Please provide company and role' });
    }

    // Create job with user reference
    const job = await Job.create({
      company,
      role,
      status: status || 'Applied',
      appliedDate: appliedDate || Date.now(),
      notes,
      user: req.user._id
    });

    res.status(201).json({ success: true, job });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ message: 'Error creating job' });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private
const updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if job belongs to user
    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    // Update job
    const { company, role, status, appliedDate, notes } = req.body;
    job = await Job.findByIdAndUpdate(
      req.params.id,
      { company, role, status, appliedDate, notes },
      { new: true, runValidators: true }
    );

    res.json({ success: true, job });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ message: 'Error updating job' });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if job belongs to user
    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ message: 'Error deleting job' });
  }
};

// @desc    Get job statistics
// @route   GET /api/jobs/stats
// @access  Private
const getStats = async (req, res) => {
  try {
    const stats = await Job.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Format stats
    const formattedStats = {
      total: 0,
      Applied: 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0
    };

    stats.forEach(stat => {
      formattedStats[stat._id] = stat.count;
      formattedStats.total += stat.count;
    });

    res.json({ success: true, stats: formattedStats });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Error fetching statistics' });
  }
};

module.exports = { getJobs, getJob, createJob, updateJob, deleteJob, getStats };
