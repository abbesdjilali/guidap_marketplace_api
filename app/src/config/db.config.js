const mysql = require('mysql');

// create here mysql connection
const cnx = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    multipleStatements: true
});

cnx.connect(function (error) {
    if (error) throw error;
    console.log('Database Connected Successfully!!!');
})

module.exports = cnx;