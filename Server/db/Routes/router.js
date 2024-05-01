const express = require('express');
const router = express.Router();
const connection = require('../connection');

// Create a new user
router.post('/newuser', async (req, res) => {
    const { id, assignedTo, title } = req.body;

    if (!id || !assignedTo || !title) {
        return res.status(422).json({ error: 'Fill all the data' });
    }

    try {
        await connection.execute("INSERT INTO users (id, assignedTo, title) VALUES (?, ?, ?)", [id, assignedTo, title]);
        
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all users
router.get('/getusers', (req, res) => {
    connection.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: 'No users found' });
        }
    });
});

// Delete a user by ID
router.delete('/deleteuser/:id', (req, res) => {
    const userId = req.params.id;

    connection.query("DELETE FROM users WHERE id = ?", [userId], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User deleted successfully' });
    });
});

module.exports = router;
