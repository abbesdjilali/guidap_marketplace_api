const {
    getAllLeisuresCenters,
    getCategoriesList,
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
} = require('../schemas/Leisurecentre.schema.js');
const {
    geocodeAddress
} = require('../services/geocoding.services');
const {
    insertCategories
} = require('../services/categorie.services');
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


// get leisure centre  by categorie
exports.getCategoriesList = (req, res) => {
    getCategoriesList(req.body.categories_id, (err, categories) => {
        if (err) res.send(err);
        console.log(categories)
        res.json(categories);
    })
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

    const {
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


    //4- INSERT RELATION TABLE (WEATHER AND CATEGORIES)
    //Insert categories in categories table
    let relationLeisureCat;
    try {
        relationLeisureCat = await insertCategories(categories, leisureCentreId);
        console.log("relationLeisureCat ", relationLeisureCat)
    } catch (error) {
        return res.status(400).send("Error to insert into categories table ", error);
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


    //5- Insert relation in leisurecentre_categories table
    //and prepare data to insert into leisurecentre_categories table
    try {
        await insertIntoLeisurecentreCategories(leisureCentreId, relationLeisureCat);
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
    console.log("requestBody :", requestBody, "id :", id)

    if (!requestBody || !id)
        return res.status(400).send("ERROR INVALID DATA TO UPDATE LEISURE CENTRE");

    //1- check all properties of leisure center to update
    const { error } = UpdateLeisureCentreSchema.validate(requestBody);
    if (error){
        console.log(error)
        return res.status(400).send(error);
    }

    console.log("Request body after validate ", requestBody);

    let leisureCentre = await getOneLeisureCentre(id);
    if (!leisureCentre)
        return res.status(400).send("NO LEISURE CENTRE WITH ID = " + id);
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
            console.log("weekWeatherJson  : ", weekWeatherJson);
            let relationLeisureWeather = await insertWeather(weekWeatherJson, id);
            console.log("relationLeisureWeather", relationLeisureWeather)
            await insertIntoLeisurecentreWeather(id, relationLeisureWeather);
        } catch (error) {
            console.log(error)
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
            status: result.affectedRows ? 200 : 400,
            message: result.affectedRows ? 'Leisure centre was deleted Successfully' : `NO LEISURE CENTRE TO DELETE WITH ID = ${id}`
        })
    } catch (error) {
        res.status(400).send(error)
    }
}


