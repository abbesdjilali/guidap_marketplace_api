const bcrypt = require('bcrypt');
const saltRounds = 10;
const cnx = require("../config/db.config");

exports.saveUser = user => new Promise((resolve, reject) => {
    cnx.query("INSERT INTO users SET ? ;",[user],(error, results) => {
        if (error)
            return reject(error);
            resolve(results.affectedRows);
    })
})
exports.checkIfUserEmailExists = email => new Promise((resolve, reject) => {
    let response = {};
    cnx.query(`SELECT * FROM users WHERE email = "${email}"`, (error, results) => {
        if (error)
            return reject(error);
        response.exists = results.length ? true : false;
        response.user = response.exists && JSON.parse(JSON.stringify(results[0]));
        resolve(response);
    })
})
exports.hashPassword = password => new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err)
                return reject(err);
            resolve(hash)
        });
    })
})