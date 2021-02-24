//Import db connexion
const cnx = require('../config/db.config');
const {
    getAllLeisureCentresQuery,
    leisureCentreExsistQuery,
    insertLeisureCentreQuery,
    updateLeisureCentreQuery,
    insertIntoLeisurecentreCategoriesQuery
} = require('../queries/leisurecentre.queries.js');

// get all leisurecenters
const getAllLeisuresCenters = (result) => {

    cnx.query(getAllLeisureCentresQuery, (err, res) => {
        if (err) {
            console.log('Error to get leisure centers', err);
            result(null, err);
        } else {
            //transforme categories string to array
            res.map(obj => {
                //console.log((obj.categories.substring(1, obj.categories.length -1).split(',')))
                obj.categories = (obj.categories.substring(1, obj.categories.length - 1).split(','))
            })
            result(null, res)
        }
    })
}

// get leisures centers by category
const getLeisureCentreByCategorie = () => {
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
const updateLeisureCentre =  (data, id) => new Promise((resolve, reject) => {
    cnx.query(updateLeisureCentreQuery(data,id),  (error, results) =>{
        if (error) {
            reject(error);
        } else {
            resolve(JSON.parse(JSON.stringify(results)));
        }
    })
})


// delete leisurecenter
const deleteLeisureCentre = () => {
}
const getLeisureCentreIfExists = data => new Promise((resolve, reject) => {
    cnx.query(leisureCentreExsistQuery, [data.lat, data.lon], function (error, results, fields) {
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
     if(result && result.length){
        updateLeisureCentre(data,id);
        return id = result[0].id;
    }else{
        id = await createLeisureCentre(data)
        return id.insertId
    }
}
exports.insertIntoLeisurecentreCategories = (leisureCentreId,data )=>{
    cnx.query(insertIntoLeisurecentreCategoriesQuery(leisureCentreId,data), (err, results) => {
        if(err) throw new Error(err.message)
        console.log(JSON.parse(JSON.stringify(results)));
    })
}
module.exports.createLeisureCentre = createLeisureCentre;
module.exports.updateLeisureCentre = updateLeisureCentre;
module.exports.deleteLeisureCentre = deleteLeisureCentre;
module.exports.getAllLeisuresCenters = getAllLeisuresCenters;
module.exports.getLeisureCentreByCategorie = getLeisureCentreByCategorie;