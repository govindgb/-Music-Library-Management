const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000; 
// Database Connection
const connectDB = require('./config/dbConfig');
connectDB();

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
