const Favorite = require('../models/favoriteModel');  // Assuming Favorite model is in models/favoriteModel.js

// CREATE a new favorite
const createFavorite = async (req, res) => {
  try {
    const { user_id, artist_id, album_id, track_id } = req.body;
    
    // Ensure at least one of artist, album, or track is specified
    if (!artist_id && !album_id && !track_id) {
      return res.status(400).json({ error: 'At least one of artist_id, album_id, or track_id must be specified.' });
    }

    const newFavorite = new Favorite({
      user_id,
      artist_id: artist_id || null,
      album_id: album_id || null,
      track_id: track_id || null,
    });

    await newFavorite.save();
    res.status(201).json({ message: 'Favorite created successfully', newFavorite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating favorite' });
  }
};

// GET all favorites for a user
const getFavorites = async (req, res) => {
  try {
    const { user_id } = req.params;

    const favorites = await Favorite.find({ user_id }).populate('artist_id album_id track_id');
    if (!favorites || favorites.length === 0) {
      return res.status(404).json({ message: 'No favorites found for this user' });
    }

    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching favorites' });
  }
};

// GET a specific favorite by favorite_id
const getFavoriteById = async (req, res) => {
  try {
    const { favorite_id } = req.params;

    const favorite = await Favorite.findOne({ favorite_id }).populate('artist_id album_id track_id');
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.status(200).json(favorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching favorite' });
  }
};

// UPDATE an existing favorite
const updateFavorite = async (req, res) => {
  try {
    const { favorite_id } = req.params;
    const { artist_id, album_id, track_id } = req.body;

    // Ensure at least one of artist, album, or track is specified
    if (!artist_id && !album_id && !track_id) {
      return res.status(400).json({ error: 'At least one of artist_id, album_id, or track_id must be specified.' });
    }

    const updatedFavorite = await Favorite.findOneAndUpdate(
      { favorite_id },
      { artist_id: artist_id || null, album_id: album_id || null, track_id: track_id || null },
      { new: true }
    ).populate('artist_id album_id track_id');

    if (!updatedFavorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.status(200).json({ message: 'Favorite updated successfully', updatedFavorite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating favorite' });
  }
};

// DELETE a favorite by favorite_id
const deleteFavorite = async (req, res) => {
  try {
    const { favorite_id } = req.params;

    const deletedFavorite = await Favorite.findOneAndDelete({ favorite_id });
    if (!deletedFavorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.status(200).json({ message: 'Favorite deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting favorite' });
  }
};

module.exports = {
  createFavorite,
  getFavorites,
  getFavoriteById,
  updateFavorite,
  deleteFavorite
};
