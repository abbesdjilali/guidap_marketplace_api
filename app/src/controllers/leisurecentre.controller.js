const {
    getAllLeisuresCenters,
    createLeisureCentre,
    updateLeisureCentreService,
    deleteLeisureCentreService,
    insertOrUpdateLeisureCentreIfExists,
    insertIntoLeisurecentreCategories,
    getOneLeisureCentre,
    geocodeAddressIfAddressChange,
    insertIntoLeisurecentreWeather,
    geocodeAndGetNewWeatherIfAddressWasChanged,
    checkData,
    getLeisureCentreIfExists
} = require('../services/leisurecentre.services');
const {
    LeisureCentreSchema,
    UpdateLeisureCentreSchema
} = require('../schemas/validation.request.schema.js');
const {
    geocodeAddress
} = require('../services/geocoding.services');

const {
    getWeekWeather,
    insertWeather
} = require('../services/openweather.services');


// get all leisure centre list
exports.getLeisuresCentresList = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const categories = req.query.categories && req.query.categories.split(',');
    const offset = (page - 1) * limit;
    const endIndex = page * limit

    try {
        let {
            leisuresCentres,
            totalItems
        } = await getAllLeisuresCenters(limit, offset, categories);

        const totalPages = Math.ceil(totalItems / limit);
        const itemsPerPage = limit > leisuresCentres.length ? leisuresCentres.length : limit;

        let results = {
            status: 200,
            // message: totalItems ? `All Leisure centre to practice the following activities : ${categories && categories.join()}` : `No data in the database`,
            totalPages: totalPages,
            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            //Math.ceil retourne le plus petit entier supérieur ou égal au nombre donné GÉNIAL :)
            totalItems: totalItems,
            itemsPerPage: itemsPerPage,
            data: leisuresCentres
        }
        console.log("leisuresCentres", leisuresCentres, totalItems)

        if (page > totalPages)
            delete results.nextPage;
        if (page <= 1)
            delete results.previousPage;

        return res.json(results)
    } catch (error) {
        return res.status(400).send(error);
    }
}


// create  leisure centre 
exports.createLeisureCentre = async (req, res) => {
    let leisureCentreReqData = req.body;

    //CHECK DATA OF REQUEST
    let errorData = checkData(leisureCentreReqData, LeisureCentreSchema);
    if (errorData && errorData.message)
        return res.json({
            status: 400,
            message: error.message
        });

    //2- Geocoding address to get latitude and longitude
    console.log("GEOCODING ADDRESS START...")

    let coordinates = await geocodeAddress(leisureCentreReqData);
    if (!coordinates)
        return res.status(400).send("Error to geocoding address");

    leisureCentreReqData['lon'] = coordinates[0];
    leisureCentreReqData['lat'] = coordinates[1];

    // CHECK IF EXISTS LEISURECENTRE WITH SAME latitude AND longitude
    // Ma logique : on ne peut pas avoir deux bases de loisirs différentes avec les mêmes coordonnées GPS
    try {
        let leisurecentreExists = await getLeisureCentreIfExists(leisureCentreReqData.lat, leisureCentreReqData.lon)
        console.log(leisurecentreExists)
        if (leisurecentreExists && leisurecentreExists.length)
            return res.json({
                status: 400,
                message: `LEISURE CENTRE EXISTS WITH SAME LATITUDE AND LONGITUDE!, leisurecentre_id = ${leisurecentreExists[0].id}`
            })
    } catch (error) {
        console.log(error)
        return res.json({
            status: 400,
            messages: error.message
        })
    }


    const categories = leisureCentreReqData.categories;
    delete leisureCentreReqData.categories;

    //INSERT INTO leisurecentre TABLE
    let leisureCentreId;
    try {
        leisureCentreId = await createLeisureCentre(leisureCentreReqData);
    } catch (error) {
        console.log(error)
        return res.json({
            status: 400,
            messages: error.message
        });
    }

    //INSERT INTO leisurecentre_categories TABLE
    console.log("INSERT INTO leisurecentre_categories TABLE START...")
    try {
        await insertIntoLeisurecentreCategories(leisureCentreId, categories);
    } catch (error) {
        console.log(error)
        return res.json({
            status: 400,
            messages: error.message
        });
    }


    //GET WEATHER DATA FOR 7 DAYS
    let weekWeatherJson;
    try {
        console.log("GET WEATHER START ...")
        weekWeatherJson = await getWeekWeather(leisureCentreReqData.lat, leisureCentreReqData.lon);
        if (Object.entries(weekWeatherJson).length === 0 || !weekWeatherJson.daily.length)
            return res.json({
                status: 400,
                messages: "ERRPR TO GET WEATHER DATA FROM OPEN WEATHER API"
            });
    } catch (error) {
        console.log(error)
        return res.json({
            status: 400,
            messages: error.message
        });
    }

    //INSERT INTO weather TABLE WEATHER DATA JSON FOR EACH DAY (7 DAYS)
    try {
        console.log("INSERT INTO WEATHER TABLE START...")
        console.log(weekWeatherJson)
        await insertWeather(weekWeatherJson, leisureCentreId);
    } catch (error) {
        console.log(error)
        return res.json({
            status: 400,
            messages: error.message
        });
    }
    console.log("leisure centre created Successfully")
    return res.json({
        status: 200,
        message: 'leisure centre created Successfully'
    })
}
// update leisure centre 
exports.updateLeisureCentre = async (req, res) => {
    let requestBody = req.body;
    let id = req.params.id
    if (!id)
        return res.json({
            status: 400,
            message: "INVALID ID"
        })
    //CHECK DATA OF REQUEST
    let errorData = checkData(requestBody, UpdateLeisureCentreSchema);
    if (errorData && errorData.message)
        return res.json({
            status: 400,
            message: errorData.message
        });

    //CHECK IF LEISURE CENTRE TO UPDATE EXISTS
    let leisureCentre = await getOneLeisureCentre(id);
    console.log("leisureCentre ", leisureCentre)
    if (!leisureCentre)
        return res.json({
            status: 404,
            message: `NOT FOUND LEISURE CENTRE WITH ID ${id}`
        });

    //CHECK IF ADDRESS WAS CHANGED
    try {
        //GEOCODE ADDRESS, COMPARE OLD COORDINATES WITH NEW AND GET WEATHER DATA IF DONT SAME
        requestBody = await geocodeAndGetNewWeatherIfAddressWasChanged(requestBody, leisureCentre);
    } catch (error) {
        return res.json({
            status: 400,
            message: error.message
        });
    }

    //UPDATE RELATION INTO leisurecentre_categories TABLE
    if (requestBody && requestBody.categories) {
        try {
            await insertIntoLeisurecentreCategories(id, requestBody.categories);
        } catch (error) {
            return res.json({
                status: 400,
                message: error.message
            });
        }
    }
    //DELETE CATEGORIES FROM REQUEST_BODY FOR INSERT INTO
    //leisurecentre TABLE
    delete requestBody.categories;

    //UPDATE leisurecentre
    try {
        await updateLeisureCentreService(requestBody, id);
    } catch (error) {
        return res.json({
            status: 400,
            message: error.message
        });
    }

    return res.json({
        status: 200,
        message: 'Leisure centre was updated Successfully'
    })
}

// delete leisure centre 
exports.deleteLeisureCentre = async (req, res) => {
    const id = req.params.id;
    if (!id)
        return res.json({
            status: 200,
            message: "INVALID ID"
        })

    try {
        let result = await deleteLeisureCentreService(id);
        return res.json({
            status: result.affectedRows ? 200 : 404,
            message: result.affectedRows ? 'Leisure centre was deleted Successfully' : `Leisure centre not found`
        })
    } catch (error) {
        return res.json({
            status: 400,
            message: error.message
        })
    }
}