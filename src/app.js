const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const trackRoutes = require('./routes/trackRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const artistRoutes = require('./routes/artistRoutes');
const albumRoutes = require('./routes/albumRoutes');
const authRoutes = require('./routes/authRoutes');
const { authenticate } = require('./middleware/authenticate');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Use the routes
app.use('/api/v1',authenticate ,userRoutes);
app.use('/api/v1',authenticate, trackRoutes);
app.use('/api/v1',authenticate, favoriteRoutes);
app.use('/artists',authenticate, artistRoutes);
app.use('/albums',authenticate, albumRoutes);
app.use('/', authRoutes);

module.exports = app;
