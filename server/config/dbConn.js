const mysql = require('mysql2');

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dong1808',
    database: 'btliot',
});

dbConn.connect(function (err) {
    if (err) throw err;
    console.log('mysql connected');
});

module.exports = dbConn