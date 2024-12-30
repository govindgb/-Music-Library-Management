const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const trackSchema = new mongoose.Schema({
  track_id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  hidden: { type: Boolean, default: false },
});

const Track = mongoose.model('Track', trackSchema);
module.exports = Track;
