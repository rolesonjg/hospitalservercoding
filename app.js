
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3002;

app.use(bodyParser.json());

function readData() {
    const rawData = fs.readFileSync('hospitals.json');
    return JSON.parse(rawData);
}

function writeData(data) {
    fs.writeFileSync('hospitals.json', JSON.stringify(data, null, 2));
}

app.get('/hospitals', (req, res) => {
    const hospitals = readData();
    res.json(hospitals);
});

app.post('/hospitals', (req, res) => {
    const hospitals = readData();
    hospitals.push(req.body);
    writeData(hospitals);
    res.json({ message: 'Hospital created' });
});

app.put('/hospitals/:id', (req, res) => {
    const hospitals = readData();
    const id = req.params.id;
    hospitals[id] = req.body;
    writeData(hospitals);
    res.json({ message: 'Hospital updated' });
});

app.delete('/hospitals/:id', (req, res) => {
    const hospitals = readData();
    const id = req.params.id;
    hospitals.splice(id, 1);
    writeData(hospitals);
    res.json({ message: 'Hospital deleted' });
});