const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  favorite_id: { type: mongoose.Schema.Types.UUID, default: () => require('crypto').randomUUID(), unique: true },
  user_id: { type: mongoose.Schema.Types.UUID, ref: 'User', required: true },
  artist_id: { type: mongoose.Schema.Types.UUID, ref: 'Artist', default: null },
  album_id: { type: mongoose.Schema.Types.UUID, ref: 'Album', default: null },
  track_id: { type: mongoose.Schema.Types.UUID, ref: 'Track', default: null },
}, { timestamps: true });

// Ensures at least one of `artist_id`, `album_id`, or `track_id` is provided
favoriteSchema.pre('save', function (next) {
  if (!this.artist_id && !this.album_id && !this.track_id) {
    next(new Error('At least one of artist_id, album_id, or track_id must be specified.'));
  } else {
    next();
  }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;
