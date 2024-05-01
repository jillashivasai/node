const mysql = require('mysql2');

const connection = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Shiva@123',
    database: 'curdmsql'
});

module.exports = connection.promise(); // Return promise-compatible connection
