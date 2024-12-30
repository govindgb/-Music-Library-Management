const express = require('express');
const {
  createFavorite,
  getFavorites,
  getFavoriteById,
  updateFavorite,
  deleteFavorite
} = require('../controllers/favoriteController');

const router = express.Router();

// Create a new favorite
router.post('/favorites', createFavorite);

// Get all favorites for a user
router.get('/favorites/:user_id', getFavorites);

// Get a specific favorite by ID
router.get('/favorites/:favorite_id', getFavoriteById);

// Update a favorite
router.put('/favorites/:favorite_id', updateFavorite);

// Delete a favorite
router.delete('/favorites/:favorite_id', deleteFavorite);

module.exports = router;
