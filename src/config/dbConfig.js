const mongoose = require('mongoose');
const Track = require('../models/trackModel'); // Adjust the path to your model
const { v4: uuidv4 } = require('uuid');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
};

module.exports = connectDB;
