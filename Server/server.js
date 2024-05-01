var express = require('express');
var app = express();
const mysql = require('mysql2');
const cors = require('cors');
const connection = require('./db/connection');
const router = require('./db/Routes/router');

const port = 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Define a route handler for the root URL
app.get('/', (req, res) => {
    res.send('Server started');
});

// Routes
app.use(router);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
    console.log("Server running on port 8080");
});
