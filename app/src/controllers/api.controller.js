const {
    getAllLeisuresCenters,
    getLeisureCentreByCategorie,
    createLeisureCentre,
    updateLeisureCentre,
    deleteLeisureCentre
} = require('../models/api.services');

// get all leisure centre list
exports.getLeisuresCentresList = (req, res) => {
    getAllLeisuresCenters((err, leisureCentres) => {
        if (err) res.send(err);
        console.log('LeisureCentre', leisureCentres);
        res.json(leisureCentres)
    })
}
