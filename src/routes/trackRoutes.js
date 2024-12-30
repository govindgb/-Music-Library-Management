const express = require('express');
const {
  createTrack,
  getAllTracks,
  getTrackById,
  updateTrack,
  deleteTrack,
} = require('../controllers/trackController');

const router = express.Router();

// Routes for Tracks
router.post('/tracks', createTrack); // Create a new track
router.get('/tracks', getAllTracks); // Get all tracks
router.get('/tracks/:id', getTrackById); // Get a specific track by ID
router.put('/tracks/:id', updateTrack); // Update a track by ID
router.delete('/tracks/:id', deleteTrack); // Delete a track by ID

module.exports = router;
