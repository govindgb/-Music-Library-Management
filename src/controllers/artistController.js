const Artist = require("../models/artistModel"); // Import the Artist model
const {sendResponse} = require('../utils/responseHelper')
const validateArtist = (artist) => {
  if (
    !artist.name ||
    artist.grammy === undefined ||
    artist.hidden === undefined
  ) {
    return "Name, grammy, and hidden fields are required.";
  }
  return null;
};

const createArtist = async (req, res) => {
  const { name, grammy, hidden } = req.body;

  const validationError = validateArtist({ name, grammy, hidden });
  if (validationError) {
    return sendResponse(res, 400, "Bad Request", null, validationError);
  }

  try {
    const newArtist = await Artist.create({ name, grammy, hidden });
    sendResponse(res, 201, "Artist created successfully.", null);
  } catch (error) {
    sendResponse(res, 500, "Internal Server Error", null, error.message);
  }
};

const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    sendResponse(res, 200, "Artists retrieved successfully.", artists);
  } catch (error) {
    sendResponse(res, 500, "Internal Server Error", null, error.message);
  }
};

const getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id, {
      name: 1,
      grammy: 1,
      hidden: 1,
      artist_id: 1,
      _id:0
    });
    if (!artist) {
      return sendResponse(
        res,
        404,
        "Artist not found",
        null,
        "Invalid artist ID"
      );
    }
    console.log(artist)
    sendResponse(res, 200, "Artist retrieved successfully.", artist);
  } catch (error) {
    sendResponse(res, 500, "Internal Server Error", null, error.message);
  }
};

const updateArtist = async (req, res) => {
  const { name, grammy, hidden } = req.body;

  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return sendResponse(
        res,
        404,
        "Artist not found",
        null,
        "Invalid artist ID"
      );
    }

    if (name) artist.name = name;
    if (grammy !== undefined) artist.grammy = grammy;
    if (hidden !== undefined) artist.hidden = hidden;

    const updatedArtist = await artist.save();
    sendResponse(res, 200, "Artist updated successfully.", updatedArtist);
  } catch (error) {
    sendResponse(res, 500, "Internal Server Error", null, error.message);
  }
};

const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);

    if (!artist) {
      return sendResponse(
        res,
        404,
        "Artist not found",
        null,
        "Invalid artist ID"
      );
    }

    sendResponse(res, 200, "Artist deleted successfully.", {
      artist_id: artist.artist_id,
    });
  } catch (error) {
    sendResponse(res, 500, "Internal Server Error", null, error.message);
  }
};

module.exports = {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
};
