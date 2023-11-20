// Define Mongoose Schema and Model (Assuming a simple structure for hospitals)

const mongoose = require('mongoose');
const hospitalSchema = new mongoose.Schema({
    name: String,
    location: String,

});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital