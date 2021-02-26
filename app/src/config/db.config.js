const mysql = require('mysql');

// create here mysql connection

const cnx = mysql.createConnection({
    host: 'db',
    port: 3306,
    user: 'guidap_user',
    password: 'guidap_pass',
    database: 'guidap_marketplace_db',
    multipleStatements: true
});

cnx.connect(function (error) {
    if (error) throw error;
    console.log('Database Connected Successfully!!!');
})

module.exports = cnx;