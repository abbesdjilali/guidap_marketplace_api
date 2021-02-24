const router = require('express').Router();
const {
    getLeisuresCentresList,
    getLeisureCentreByCategorie,
    createLeisureCentre,
    updateLeisureCentre,
    deleteLeisureCentre
} = require('../controllers/leisurecentre.controller');

// get all LeisureCentre
router.get('/', getLeisuresCentresList);

// get LeisureCentre by categorie
router.post('/by-categorie', getLeisureCentreByCategorie);

// create LeisureCentre
router.post('/', createLeisureCentre);

// update LeisureCentre
router.put('/:id', updateLeisureCentre);

// delete LeisureCentre
router.delete('/:id', deleteLeisureCentre);

module.exports = router;