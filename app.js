const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5004;
require("./db/db")
require('dotenv').config();

const Hospital = require("./models/HospitalSchema")

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));








// // Define Mongoose Schema and Model (Assuming a simple structure for hospitals)
// const hospitalSchema = new mongoose.Schema({
//     name: String,
//     location: String,
//     // Add other fields as needed
// });

// const Hospital = mongoose.model('Hospital', hospitalSchema);



// Route to get all hospitals
app.get('/hospitals', async (req, res) => {
    try {
        const hospitals = await Hospital.find();
        res.json(hospitals);
    } catch (error) {
        console.error('Error fetching hospitals:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to add a new hospital
app.post('/hospitals', async (req, res) => {
    try {
        const newHospital = new Hospital(req.body);
        const savedHospital = await newHospital.save();
        res.json({ message: 'Hospital created', hospital: savedHospital });
    } catch (error) {
        console.error('Error creating hospital:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to update a hospital
app.put('/hospitals/:id', async (req, res) => {
    try {
        const updatedHospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'Hospital updated', hospital: updatedHospital });
    } catch (error) {
        console.error('Error updating hospital:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to delete a hospital
app.delete('/hospitals/:id', async (req, res) => {
    try {
        await Hospital.findByIdAndRemove(req.params.id);
        res.json({ message: 'Hospital deleted' });
    } catch (error) {
        console.error('Error deleting hospital:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
