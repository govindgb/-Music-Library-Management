const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const trackRoutes = require('./routes/trackRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const artistRoutes = require('./routes/artistRoutes');
const albumRoutes = require('./routes/albumRoutes');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Use the routes
app.use('/api/v1', userRoutes);
app.use('/api/v1', trackRoutes);
app.use('/api/v1', favoriteRoutes);
app.use('/artists', artistRoutes);
app.use('/albums', albumRoutes);

module.exports = app;
