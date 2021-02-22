const router = require('express').Router();

const {getLeisuresCentresList} = require('../controllers/api.controller');

// get all LeisureCentre
router.get('/', getLeisuresCentresList);

module.exports = router;