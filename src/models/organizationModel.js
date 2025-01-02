const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Each organization must have a unique name
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, // References the User model
    ref: 'User',
  },
}, { timestamps: true });

module.exports = mongoose.model('Organization', organizationSchema);
