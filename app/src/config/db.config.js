const mysql = require('mysql');

// create here mysql connection
const cnx = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || "root",
    password:process.env.MYSQL_PASSWORD || "1927ad19",
    database:process.env.MYSQL_DATABASE,
    multipleStatements: true
});

cnx.connect(function (error) {
    if (error) throw error;
    console.log('Database Connected Successfull!!!');
})

module.exports = cnx;