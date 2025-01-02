const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    default: uuidv4, // Automatically generate UUID
    unique: true, // Ensure it is unique
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Editor', 'Viewer'], default: 'Viewer' },
  organization: {
    type: String, // References the Organization model
    ref: 'Organization',
    required: function () {
      return this.role === 'editor' || this.role === 'admin'; // Required for admin or editor
    },
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;


