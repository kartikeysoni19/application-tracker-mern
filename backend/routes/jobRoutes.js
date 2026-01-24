const express = require('express');
const router = express.Router();
const { 
  getJobs, 
  getJob, 
  createJob, 
  updateJob, 
  deleteJob, 
  getStats 
} = require('../controllers/jobController');
const { protect } = require('../middleware/auth');

// All routes are protected - require authentication
router.use(protect);

// Stats route (must be before /:id to avoid conflict)
router.get('/stats', getStats);

// CRUD routes
router.route('/')
  .get(getJobs)
  .post(createJob);

router.route('/:id')
  .get(getJob)
  .put(updateJob)
  .delete(deleteJob);

module.exports = router;
