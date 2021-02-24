const {
    getAllLeisuresCenters,
    getLeisureCentreByCategorie,
    createLeisureCentre,
    updateLeisureCentre,
    deleteLeisureCentre,
    insertOrUpdateLeisureCentreIfExists,
    insertIntoLeisurecentreCategories
} = require('../services/leisurecentre.services');
const {
    LeisureCentreSchema
} = require('../schemas/Leisurecentre.schema.js');
const {
    geocodeAddress
} = require('../services/geocoding.services');
const {insertCategories} = require('../services/categorie.services')

// get all leisure centre list
exports.getLeisuresCentresList = (req, res) => {
    getAllLeisuresCenters((err, leisureCentres) => {
        if (err) res.send(err);
        console.log('LeisureCentre', leisureCentres);
        res.json(leisureCentres)
    })
}


// get leisure centre  by categorie
exports.getLeisureCentreByCategorie = (req, res) => {
    console.log(req.body)
    getLeisureCentreByCategorie(req.body.categories_id, (err, leisuresCentres) => {
        if (err) res.send(err);
        console.log(leisuresCentres)
        res.json(leisuresCentres);
    })
}

// create  leisure centre 
exports.createLeisureCentre = async (req, res) => {
    let leisureCentreReqData = req.body;

    //1- check all properties of leisure center
    const {error} = LeisureCentreSchema.validate(leisureCentreReqData);
    if (error) return res.status(400).send(error.details[0].message);

    const { categories } = leisureCentreReqData;
    delete leisureCentreReqData.categories;

    //2- Geocoding address to get latitude and longitude
    try {
        let coordinates = await geocodeAddress(leisureCentreReqData);
        leisureCentreReqData['lon'] = coordinates[0];
        leisureCentreReqData['lat'] = coordinates[1];
    } catch (error) {
        return res.status(400).send("Error to geocoding address :",error);
    }

   
    //3- IF LEISURECENTRE EXISTS UPDATE ELSE INSERT INTO 
    // SI une base de loisirs exsiste avec la même latitude et longitude
    // en l'insérant on duplique la data dans la base de données
    // Ma logique : on ne peut pas avoir deux bases de loisirs différentes avec les mêmes coordonnées GPS
    let leisureCentreId = await insertOrUpdateLeisureCentreIfExists(leisureCentreReqData)

    //4- Insert categories in db
    let relationLeisureCat = await insertCategories(categories,leisureCentreId);
    
    //5- Insert relation in leisurecentre_categories table
    //and prepare data to insert into leisurecentre_categories table
/*     tabCategoriesId = tabCategoriesId.map(relation=>{
        return [leisureCentreId,relation[0].id];
    }) */
    try {
        await insertIntoLeisurecentreCategories(leisureCentreId, relationLeisureCat)
    } catch (error) {
        return res.status(400).send("Error to insert relation into leisurecentre_categories table :", error);
    }
    
    res.json({
        status: true,
        message: 'leisure centre created Successfully',
    }) 

}
// update leisure centre 
exports.updateLeisureCentre = (req, res) => {
}

// delete leisure centre 
exports.deleteLeisureCentre = (req, res, next) => {
}
