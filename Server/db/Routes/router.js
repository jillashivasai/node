const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.post('/newuser', async (req, res) => {
    const { id, assignedTo, title } = req.body;

    if (!id || !assignedTo || !title) { // Check if status is missing
        res.status(422).json('Fill all the data');
        return;
    }

    try {
        // Check if the user already exists
        const [existingUser] = await connection.execute("SELECT * FROM users WHERE id = ?", [id]);
        if (existingUser.length > 0) {
            res.status(409).json('User already exists');
            return;
        }

        // Insert new user into the database
        await connection.execute("INSERT INTO users (id, assignedTo, title) VALUES (?, ?, ?, ?)", [id, assignedTo, title]);
        
        res.status(201).json('User created successfully');
    } catch (error) {
        console.error('Error creating user:', error);
        console.log('Request body:', req.body); // Log request body
        res.status(500).json('Internal Server Error: ' + error.message); // Return error message
    }
});

module.exports = router;
