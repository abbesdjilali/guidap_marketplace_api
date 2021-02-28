const router = require('express').Router();

const {
    createUser,
    authenticateUser
}=require('../controllers/user.controller');

router.post('/register',createUser);

router.post('/login',authenticateUser)

module.exports = router