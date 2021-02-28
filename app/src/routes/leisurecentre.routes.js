const router = require('express').Router();
const {
    checkToken
} = require('../middlewares/jwt.middleware')

const {
    getLeisuresCentresList,
    getCategoriesList,
    createLeisureCentre,
    updateLeisureCentre,
    deleteLeisureCentre, 
    createCategorie
} = require('../controllers/leisurecentre.controller');

// get all LeisureCentre

router.get('/', getLeisuresCentresList);


// create a new LeisureCentre
router.post('/', checkToken, createLeisureCentre);

// update one LeisureCentre
router.put('/:id', checkToken, updateLeisureCentre);

// update categories of LeisureCentre
router.put('/categories/:id', checkToken, updateLeisureCentre);

// delete one LeisureCentre
router.delete('/:id', checkToken, deleteLeisureCentre);

module.exports = router;