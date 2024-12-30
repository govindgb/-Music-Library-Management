const Track = require('../models/trackModel'); // Import the Track model

// CREATE a new track
const createTrack = async (req, res) => {
  try {
    const { track_id, name, duration, hidden } = req.body;

    const result = await Track.create({ track_id, name, duration, hidden });

    res.status(201).json({ message: 'Track created successfully', result });
  } catch (error) {
    console.error('Error creating track:', error);
    res.status(500).json({ error: 'Error creating track', details: error });
  }
};

// READ all tracks
const getAllTracks = async (req, res) => {
  try {
    const tracks = await Track.find();
    res.status(200).json({ message: 'Tracks retrieved successfully', tracks });
  } catch (error) {
    console.error('Error retrieving tracks:', error);
    res.status(500).json({ error: 'Error retrieving tracks' });
  }
};

// READ a specific track by ID
const getTrackById = async (req, res) => {
  try {
    const { id } = req.params;
    const track = await Track.findOne({ track_id: id });
    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }

    res.status(200).json({ message: 'Track retrieved successfully', track });
  } catch (error) {
    console.error('Error retrieving track:', error);
    res.status(500).send(error);
  }
};

// UPDATE a track by ID
const updateTrack = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, duration, hidden } = req.body;

    const track = await Track.findOneAndUpdate(
      { track_id: id },
      { name, duration, hidden },
      { new: true } // Return the updated document
    );

    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }

    res.status(200).json({ message: 'Track updated successfully', track });
  } catch (error) {
    console.error('Error updating track:', error);
    res.status(500).json({ error: 'Error updating track' });
  }
};

// DELETE a track by ID
const deleteTrack = async (req, res) => {
  try {
    const { id } = req.params;

    const track = await Track.findOneAndDelete({ track_id: id });
    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }

    res.status(200).json({ message: 'Track deleted successfully', track });
  } catch (error) {
    console.error('Error deleting track:', error);
    res.status(500).json({ error: 'Error deleting track' });
  }
};

module.exports = {
  createTrack,
  getAllTracks,
  getTrackById,
  updateTrack,
  deleteTrack,
};
