const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
const app = require('./app');

dotenv.config();

const PORT = process.env.PORT || 3000;
// Test database connection
(async () => {
    try {
        await db.query('SELECT 1'); // Simple query to test the connection
        console.log('Connected to the database');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
})();