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

// create a new LeisureCentre
router.post('/', createLeisureCentre);

// update one LeisureCentre
router.put('/:id', updateLeisureCentre);

// update categories of LeisureCentre
router.put('/categories/:id', updateLeisureCentre);

// delete one LeisureCentre
router.delete('/:id', deleteLeisureCentre);

module.exports = router;