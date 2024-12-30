const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Artist Schema
const artistSchema = new mongoose.Schema({
  artist_id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  grammy: {
    type: Boolean,
    default: false,  // Default value if not provided
  },
  hidden: {
    type: Boolean,
    default: false,  // Default visibility is set to false
  },
}, {
  timestamps: true,  // Adds createdAt and updatedAt timestamps
});

const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;
