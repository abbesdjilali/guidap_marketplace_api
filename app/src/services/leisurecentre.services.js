//Import db connexion
const cnx = require('../config/db.config');
const moment = require("moment");
const tz = require('moment-timezone');
const {
    getAllLeisureCentresQuery,
    leisureCentreExsistQuery,
    insertLeisureCentreQuery,
    updateLeisureCentreQuery,
    insertIntoLeisurecentreCategoriesQuery,
    insertIntoLeisurecentreWeatherQuery
} = require('../queries/leisurecentre.queries.js');
const {
    geocodeAddress
} = require('./geocoding.services');

//Get one leisure centre by id
const getOneLeisureCentre = id => new Promise((resolve, reject) => {
    cnx.query('SELECT * FROM leisurecentre WHERE id = ?', id, (err, results) => {
        if (err) {
            reject(err);
        } else {
            resolve(JSON.parse(JSON.stringify(results[0])));
        }
    })
})


// get all leisurecenters
const getAllLeisuresCenters = () => new Promise((resolve, reject) => {

    const start = moment.tz("Europe/Paris").startOf('day').utc().unix();
    const end = moment.tz("Europe/Paris").endOf('day').utc().unix();
    cnx.query(getAllLeisureCentresQuery(start,end), (err, res) => {
        if (err) return reject(err);
        //group categories name(string) in to array
        console.log("res before map", res);
        res.map(obj => {
            obj.categories = (obj.categories.substring(1, obj.categories.length - 1).split(','))
        })
        console.log("res after map", res);

        resolve(res);

    })
})


// get leisures centers by category
const getLeisureCentreByCategorie = (...categories_id) => {
    console.log(categories_id)
    cnx.query(getLeisurCentreByCategorie(categories_id), (err, res) => {
        if (err) {
            console.log('Error to get leisure centers by categorie', err);
            result(null, err);
        } else {
            console.log(res)
            result(null, res);
        }
    })
}

// create new leisurecenter
const createLeisureCentre = data => new Promise((resolve, reject) => {
    cnx.query(insertLeisureCentreQuery, data, (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(JSON.parse(JSON.stringify(results)));
        }
    });
})

// update leisurecentre
const updateLeisureCentreService = (data, id) => new Promise((resolve, reject) => {
    cnx.query(updateLeisureCentreQuery, [data, id], (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(JSON.parse(JSON.stringify(results)));
        }
    })
})


// delete leisurecenter with Stored Procedures deleteLeisureCentre (Bonus)
const deleteLeisureCentreService = id => new Promise((resolve, reject) => {
    cnx.query("CALL deleteLeisureCentre(?)", [parseInt(id)], (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(JSON.parse(JSON.stringify(results)));
        }
    });
})
const getLeisureCentreIfExists = data => new Promise((resolve, reject) => {
    cnx.query(leisureCentreExsistQuery, [data.lat, data.lon], (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(JSON.parse(JSON.stringify(results)));
        }
    });

})
exports.insertOrUpdateLeisureCentreIfExists = async (data) => {
    let result = await getLeisureCentreIfExists(data);
    let id
    if (result && result.length) {
        id = result[0].id;
        await updateLeisureCentreService(data, id);
        return id;
    } else {
        id = await createLeisureCentre(data)
        return id.insertId
    }
}
exports.insertIntoLeisurecentreCategories = (leisureCentreId, data) => {
    console.log(leisureCentreId, data)
    cnx.query(insertIntoLeisurecentreCategoriesQuery, [leisureCentreId, data], (err, results) => {
        if (err) throw new Error(err.message)
        console.log(JSON.parse(JSON.stringify(results)));
    })
}
exports.insertIntoLeisurecentreWeather = (leisureCentreId, data) => {
    console.log(leisureCentreId, data)
    cnx.query(insertIntoLeisurecentreWeatherQuery, [leisureCentreId, data], (err, results) => {
        if (err) throw new Error(err.message)
        console.log(JSON.parse(JSON.stringify(results)));
    })
}
const geocodeAddressIfAddressChange = async (requestBody, id) => {
    //Get leisurecentre to complete address when user dont change full address.
    let leisureCentre = await getOneLeisureCentre(id);

    if (!requestBody.addressName) requestBody.addressName = leisureCentre.addressName;
    if (!requestBody.zipCode) requestBody.zipCode = leisureCentre.zipCode;
    if (!requestBody.cite) requestBody.cite = leisureCentre.cite;
    if (!requestBody.country) requestBody.country = leisureCentre.country;


    try {
        let coordinates = await geocodeAddress(requestBody);
        requestBody['lon'] = coordinates[0];
        requestBody['lat'] = coordinates[1];
        return requestBody;
    } catch (error) {
        throw new Error(error)
    }
}
module.exports.createLeisureCentre = createLeisureCentre;
module.exports.updateLeisureCentreService = updateLeisureCentreService;
module.exports.deleteLeisureCentreService = deleteLeisureCentreService;
module.exports.getAllLeisuresCenters = getAllLeisuresCenters;
module.exports.getLeisureCentreByCategorie = getLeisureCentreByCategorie;
module.exports.getOneLeisureCentre = getOneLeisureCentre;
module.exports.geocodeAddressIfAddressChange = geocodeAddressIfAddressChange;