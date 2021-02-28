const {
    getAllLeisuresCenters,
    createLeisureCentre,
    updateLeisureCentreService,
    deleteLeisureCentreService,
    insertOrUpdateLeisureCentreIfExists,
    insertIntoLeisurecentreCategories,
    getOneLeisureCentre,
    geocodeAddressIfAddressChange,
    insertIntoLeisurecentreWeather
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
const {
    string
} = require('joi');

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
    console.log("test")
    console.log("leisureCentreReqData ", leisureCentreReqData);

    //1- check all properties of leisure center
    const {
        error
    } = LeisureCentreSchema.validate(leisureCentreReqData);
    if (error) return res.status(400).send(error.details[0].message);

    let {
        categories
    } = leisureCentreReqData;
    delete leisureCentreReqData.categories;

    //2- Geocoding address to get latitude and longitude
    try {
        let coordinates = await geocodeAddress(leisureCentreReqData);
        leisureCentreReqData['lon'] = coordinates[0];
        leisureCentreReqData['lat'] = coordinates[1];
    } catch (error) {
        return res.status(400).send("Error to geocoding address :", error);
    }

    //Get weather for 7 days
    let weekWeatherJson;
    try {
        weekWeatherJson = await getWeekWeather(leisureCentreReqData.lat, leisureCentreReqData.lon);
        console.log("weekWeatherJson  : ", weekWeatherJson);
    } catch (error) {
        return res.status(400).send(error);
    }


    //3- IF LEISURECENTRE EXISTS UPDATE ELSE INSERT INTO 
    // SI une base de loisirs exsiste avec la même latitude et longitude
    // en l'insérant on duplique la data dans la base de données
    // Ma logique : on ne peut pas avoir deux bases de loisirs différentes avec les mêmes coordonnées GPS
    let leisureCentreId
    try {
        leisureCentreId = await insertOrUpdateLeisureCentreIfExists(leisureCentreReqData);
    } catch (error) {
        return res.status(400).send(error);
    }


    //   Insert weather day in weather table   
    let relationLeisureWeather;
    try {
        relationLeisureWeather = await insertWeather(weekWeatherJson, leisureCentreId);
        console.log("relationLeisureWeather :", relationLeisureWeather)
    } catch (error) {
        console.log(error)
        return res.status(400).send(error);
    }

    let relationLeisureCategories = categories.map(cat => {
        return [leisureCentreId, cat]
    })
    //5- Insert relation in leisurecentre_categories table
    //and prepare data to insert into leisurecentre_categories table
    try {
        await insertIntoLeisurecentreCategories(leisureCentreId, relationLeisureCategories);
    } catch (error) {
        return res.status(400).send(error);
    }

    try {
        await insertIntoLeisurecentreWeather(leisureCentreId, relationLeisureWeather);
    } catch (error) {
        return res.status(400).send(error);
    }

    res.json({
        status: 200,
        message: 'leisure centre created Successfully',
    })

}
// update leisure centre 
exports.updateLeisureCentre = async (req, res) => {
    let requestBody = req.body;
    let id = req.params.id

    if (Object.entries(requestBody).length === 0 || !id)
        return res.json({
            status: 400,
            message: "ERROR INVALID DATA TO UPDATE LEISURE CENTRE"
        });

    //1- check all properties of leisure center to update
    const {
        error
    } = UpdateLeisureCentreSchema.validate(requestBody);
    if (error) {
        console.log(error)
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }

    let leisureCentre = await getOneLeisureCentre(id);
    if (!leisureCentre)
        return res.json({
            status: 404,
            message: `NOT FOUND LEISURE CENTRE WITH ID ${id}`
        })
    //If update addresName,zipCode,cite or country
    //Geocoding address to get new latitude and longitude
    //Get weather for new address
    const {
        addressName,
        zipCode,
        cite,
        country
    } = requestBody;
    if (addressName || zipCode || cite || country) {
        try {
            requestBody = await geocodeAddressIfAddressChange(requestBody, leisureCentre);
            //Get weather for 7 days
            let weekWeatherJson = await getWeekWeather(requestBody.lat, requestBody.lon);
            let relationLeisureWeather = await insertWeather(weekWeatherJson, id);
            await insertIntoLeisurecentreWeather(id, relationLeisureWeather);

        } catch (error) {
            return res.json({
                status:400,
                message:error.message
            });
        }
    }
    console.log("request body",requestBody)
    if(requestBody && requestBody.categories){
        const {categories = false} = requestBody.categories;
        delete requestBody.categories;
        let relationLeisureCategories = categories.map(cat => {
            return [leisureCentreId, cat]
        })
        //5- Insert relation in leisurecentre_categories table
        //and prepare data to insert into leisurecentre_categories table
        try {
            await insertIntoLeisurecentreCategories(leisureCentreId, relationLeisureCategories);
        } catch (error) {
            return res.status(400).send(error);
        }
    }


    //Update leisure centre 
    try {
        await updateLeisureCentreService(requestBody, id);
        res.json({
            status: 200,
            message: 'Leisure centre was updated Successfully',
        })
    } catch (error) {
        return res.status(400).send(error);
    }

}

// delete leisure centre 
exports.deleteLeisureCentre = async (req, res) => {
    const id = req.params.id;
    if (!id)
        res.status(400).send('You must enter a valid ID in to url')
    try {
        let result = await deleteLeisureCentreService(id);
        res.json({
            status: result.affectedRows ? 200 : 404,
            message: result.affectedRows ? 'Leisure centre was deleted Successfully' : `Leisure centre not found`
        })
    } catch (error) {
        res.json({
            status:400,
            message:error.message
        })
    }
}