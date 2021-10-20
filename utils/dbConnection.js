const mysql = require('mysql2');

const dbConnection = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    database: 'cursova',
    password: 'root'
});

module.exports = dbConnection.promise();