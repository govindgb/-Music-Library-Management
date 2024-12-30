const Album = require('../models/albumModel'); 
const Artist = require("../models/artistModel");
const { sendResponse } = require('../utils/responseHelper'); 



const createAlbum = async (req, res) => {
    try {
        const { artist_id, name, year, hidden } = req.body;

        // Validate required fields
        if (!artist_id || !name || !year) {
            return sendResponse(res, 400, "Bad Request", null, "Missing required fields");
        }

        // Check if the artist exists
        const artist = await Artist.findById( artist_id );
        if (!artist) {
            return sendResponse(res, 404, "Artist not found", null, "Invalid artist_id");
        }

        const newAlbum = await Album.create({
            artist_id,
            name,
            year,
            hidden,
        });
        sendResponse(res, 201, "Album created successfully.", null);

    } catch (error) {
        sendResponse(res, 500, "Internal Server Error", null, error.message);
    }
};
const getAllAlbums = async (req, res) => {
    try {
        const albums = await Album.findById(req.params.id, { album_id: 1, artist_id: 1 , name: 1, year: 1, hidden: 1, _id: 0 });

        sendResponse(res, 200, "Albums retrieved successfully.", albums);
    } catch (error) {
        sendResponse(res, 500, "Internal Server Error", null, error.message);
    }
};

const getAlbumById = async (req, res) => {
    try {
        console.log(req.params.id)
        const album = await Album.findById(req.params.id, { album_id: 1, name: 1, year: 1, hidden: 1, _id: 0 });

        if (!album) {
            return sendResponse(res, 404, "Album not found", null, "Invalid album ID");
        }

        sendResponse(res, 200, "Album retrieved successfully.", album);
    } catch (error) {
        sendResponse(res, 500, "Internal Server Error", null, error.message);
    }
};

const updateAlbum = async (req, res) => {
    try {
        const { name, year, hidden } = req.body;

        const album = await Album.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { name, year, hidden } },
            { new: true, projection: { album_id: 1, name: 1, year: 1, hidden: 1, _id: 0 } }
        );
        // const album = await Album.findByIdAndUpdate(
        //     req.params.id,
        //     { name, year, hidden },
        //     { new: true , projection: { album_id: 1, name: 1, year: 1, hidden: 1, _id: 0 }}
        //   );
        if (!album) {
            return sendResponse(res, 404, "Album not found", null, "Invalid album ID");
        }

        sendResponse(res, 200, "Album updated successfully.", album);
    } catch (error) {
        sendResponse(res, 500, "Internal Server Error", null, error.message);
    }
};

const deleteAlbum = async (req, res) => {
    try {
        const album = await Album.findOneAndDelete({ album_id: req.params.id }, { projection: { album_id: 1, name: 1, year: 1, hidden: 1, _id: 0 } });

        if (!album) {
            return sendResponse(res, 404, "Album not found", null, "Invalid album ID");
        }

        sendResponse(res, 200, "Album deleted successfully.", album);
    } catch (error) {
        sendResponse(res, 500, "Internal Server Error", null, error.message);
    }
};

module.exports = {
    createAlbum,
    getAllAlbums,
    getAlbumById,
    updateAlbum,
    deleteAlbum,
};
