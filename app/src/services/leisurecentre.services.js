const {
    geocodeAddress
} = require('../services/geocoding.services');
//Import db connexion
const cnx = require('../config/db.config');
const {
    getAllLeisureCentresQuery,
    leisureCentreExsistQuery,
    insertLeisureCentreQuery,
    updateLeisureCentreQuery,
    insertIntoLeisurecentreCategoriesQuery,
    insertIntoLeisurecentreWeatherQuery
} = require('../queries/leisurecentre.queries.js');
const {
    getWeekWeather,
    insertWeather
} = require('../services/openweather.services');

//Get one leisure centre by id
const getOneLeisureCentre = id => new Promise((resolve, reject) => {
    console.log("id :", id)
    cnx.query('SELECT * FROM leisurecentre WHERE id = ?', id, (err, results) => {
        if (err) {
            return reject(err);
        } else {
            resolve(results[0]);
        }
    })
})


// get all leisurecenters
const getAllLeisuresCenters = (limit, offset, categories) => new Promise((resolve, reject) => {
    cnx.query(getAllLeisureCentresQuery(limit, offset, categories), (err, res) => {
        if (err) return reject(err);

        //FORMAT RESPONSE AND PARSE WEATHER JSON
        if (res[0].length)
            res = formatResponse(res);
        resolve({
            leisuresCentres: res[0],
            totalItems: res[1].length ? res[1][0].nbItems : 0
        });

    })
})
const formatResponse = response => {
    response[0].map(obj => {
        categories = obj.categories.split(',')
        obj.categories = categories.map(cat => {
            let tab = cat.split('-');
            return {
                "id": parseInt(tab[0]),
                "name": tab[1]
            }

        })
        obj.weather = JSON.parse(obj.weather);
    })

    return response;
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
    let response = {
        isInserted: false
    };
    if (result && result.length) {
        response.id = result[0].id;
        await updateLeisureCentreService(data, response.id);
    } else {
        let res = await createLeisureCentre(data);
        response.id = res.insertId;
        response.isInserted = true;
    }
    return response;
}
exports.insertIntoLeisurecentreCategories = (leisureCentreId, categories) => {
    let relationLeisureCategories = categories.map(cat => {
        return [leisureCentreId, cat]
    })
    cnx.query(insertIntoLeisurecentreCategoriesQuery, [leisureCentreId, relationLeisureCategories], (err, results) => {
        if (err) return err
        //console.log(JSON.parse(JSON.stringify(results)));
    })
}
const insertIntoLeisurecentreWeather = (leisureCentreId, data) => {
    console.log(leisureCentreId, data)
    cnx.query(insertIntoLeisurecentreWeatherQuery, [leisureCentreId, data], (err, results) => {
        if (err) throw new Error(err.message)
        console.log(JSON.parse(JSON.stringify(results)));
    })
}
const geocodeAddressIfAddressChange = async (requestBody, leisureCentre) => {
    if (!requestBody.addressName) requestBody.addressName = leisureCentre.addressName;
    if (!requestBody.zipCode) requestBody.zipCode = leisureCentre.zipCode;
    if (!requestBody.cite) requestBody.cite = leisureCentre.cite;
    if (!requestBody.country) requestBody.country = leisureCentre.country;
    try {
        let coordinates = await geocodeAddress(requestBody);
        return {
            lon: coordinates[0],
            lat: coordinates[1]
        }

    } catch (error) {
        return error
    }
}
exports.checkData = (requestBody, schema) => {
    let error = {};
    //check if request body is empty
    if (Object.entries(requestBody).length === 0)
        return error.message = "ERROR INVALID DATA TO UPDATE LEISURE CENTRE"

    //1- check all properties of schema
    const {err} = schema.validate(requestBody);
    if (err)
         error.message = err.message
    return error;
}


//If update addresName,zipCode,cite or country
//Geocoding address to get new latitude and longitude
//compare old coordinates with new
//if same dont fetch data from openweather else do
exports.geocodeAndGetNewWeatherIfAddressWasChanged = async (requestBody, leisureCentre) => {
    const {
        addressName,
        zipCode,
        cite,
        country
    } = requestBody;
    let newCoordinates,lat,lon;
    if (addressName || zipCode || cite || country) {

        //I DO THIS TO GET FULL ADDRESS TO GET LATITUDE AND LONGITUDE WITH PREDISION
        if (!requestBody.addressName) requestBody.addressName = leisureCentre.addressName;
        if (!requestBody.zipCode) requestBody.zipCode = leisureCentre.zipCode;
        if (!requestBody.cite) requestBody.cite = leisureCentre.cite;
        if (!requestBody.country) requestBody.country = leisureCentre.country;

        try {
            newCoordinates = await geocodeAddress(requestBody);
            lon = newCoordinates[0];
            lat = newCoordinates[1];
        } catch (error) {
            return error;
        }
    }

    //Verify if address was really changed to compare old lat and lon with new lat and lon
    if (leisureCentre.lat !== lat || leisureCentre.lon !== lon) {
        try {
            //Get weather for 7 days
            let weekWeatherJson = await getWeekWeather(lat,lon);
            let relationLeisureWeather = await insertWeather(weekWeatherJson, leisureCentre.id);
            await insertIntoLeisurecentreWeather(leisureCentre.id, relationLeisureWeather);
        } catch (error) {
            return error;
        }
    }
    requestBody.lat = lat;
    requestBody.lon = lon;
    return requestBody;
}
module.exports.createLeisureCentre = createLeisureCentre;
module.exports.updateLeisureCentreService = updateLeisureCentreService;
module.exports.deleteLeisureCentreService = deleteLeisureCentreService;
module.exports.getAllLeisuresCenters = getAllLeisuresCenters;
module.exports.getOneLeisureCentre = getOneLeisureCentre;
module.exports.geocodeAddressIfAddressChange = geocodeAddressIfAddressChange;
module.exports.insertIntoLeisurecentreWeather = insertIntoLeisurecentreWeather;