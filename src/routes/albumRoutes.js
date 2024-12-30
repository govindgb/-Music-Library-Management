const express = require('express');
const router = express.Router();
const { createAlbum, getAllAlbums, getAlbumById, updateAlbum, deleteAlbum } = require('../controllers/albumController');

// Routes
router.post('/add-album', createAlbum);
router.get('/all-albums', getAllAlbums);
router.get('/:id', getAlbumById);
router.put('/update-album/:id', updateAlbum);
router.delete('/delete-album/:id', deleteAlbum);

module.exports = router;
