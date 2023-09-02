const mysql = require('mysql2'); //thư viện mysql

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '120202',
    database: 'btl_iot',
});

dbConn.connect(function (err) {
    if (err) throw err;
    console.log('mysql connected');
});

module.exports = dbConn