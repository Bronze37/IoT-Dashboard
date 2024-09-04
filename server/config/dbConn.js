const mysql = require('mysql2');

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '01062002',
    database: 'btliot',
});

dbConn.connect(function (err) {
    if (err) throw err;
    console.log('mysql connected');
});

module.exports = dbConn