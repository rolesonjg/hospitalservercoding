const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URI
const url = process.env.MONGODB_URI

// Mongoose options
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Connect to MongoDB
mongoose.connect(url, mongooseOptions);

// Get the default connection
const db = mongoose.connection;

// Event listeners for connection events

// When successfully connected
db.on('connected', () => {
    console.log('Connected to MongoDB');
});

// If the connection throws an error
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});


// Export the Mongoose instance for potential use in other parts of your application
module.exports.db = db;
