const express = require('express');
const { 
    createArtist, 
    getAllArtists, 
    getArtistById, 
    updateArtist, 
    deleteArtist 
} = require('../controllers/artistController');

const router = express.Router();

router.post('/add-artist', createArtist);
router.get('/', getAllArtists);
router.get('/:id', getArtistById);
router.put('/:id', updateArtist);
router.delete('/:id', deleteArtist);

module.exports = router;