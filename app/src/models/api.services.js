const cnx = require('../config/db.config');
const {
    getAllLeisureCentres
} = require('../queries/api.sql.request.js');



// get all leisurecenters
exports.getAllLeisuresCenters = (result) => {

    cnx.query(getAllLeisureCentres, (err, res) => {
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

// get leisures centers by catégories
exports.getLeisureCentreByCategorie = () => {
}

// create new leisurecenter
exports.createLeisureCentre = () => {

}

// update leisurecenter
exports.updateLeisureCenter = () => {
}

// delete leisurecenter
exports.deleteLeisureCenter = () => {
}
