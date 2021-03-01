const bcrypt = require('bcrypt');
const {
    generateAccessToken,
} = require('../middlewares/jwt.middleware')
const {
    User,
} = require('../schemas/validation.request.schema');
const {
    saveUser,
    hashPassword,
    checkIfUserEmailExists
} = require("../services/user.services");

exports.createUser = async (req, res) => {
    let user = req.body
    if (Object.entries(user).length === 0)
        return res.json({
            status: 400,
            message: "INVALID DATA FOR CREATE NEW USER "
        })
    const {
        error
    } = User.validate(user);
    if (error)
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    //BOOLEAN TRUE IF EXISTS ELSE FALSE
    try {
        const {
            exists
        } = await checkIfUserEmailExists(user.email);
        if (exists)
            return res.json({
                status: 400,
                message: "EMAIL IS ALEARDY TAKEN"
            })
    } catch (error) {
        return res.json({
            status: 400,
            message: error.message
        });
    }

    // console.log("user", user);
    user.password = await hashPassword(user.password);
    try {
        delete user.passwordConfirmation;
        user.id = await saveUser(user);
    } catch (error) {
        return res.json({
            status: 400,
            message: error.message
        })
    }

    res.json({
        status: 200,
        message: "USER WAS CREATED SUCCESSFULLY",
        id: user.id
    })
}

exports.authenticateUser = async (req, res) => {
    const {
        email,
        password
    } = req.body;
    if (!email || !password)
        return res.json({
            status: 400,
            message: "INVALID EMAIL OR PASSWORD"
        })
    try {
        const {
            user,
            exists
        } = await checkIfUserEmailExists(email);
        if (!exists)
            return res.json({
                status: 400,
                message: "USER NOT FOUND"
            })
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.json({
                status: 400,
                message: "PASSWORD NOT MATCH"
            })


        //TO:DO LOGIN AND GENERATE JSON WEB TOKEN
        delete user.password;
        console.log("user:",user)
        const accessToken = generateAccessToken(user)
        res.json({
            status: 200,
            user,
            accessToken
        })
    } catch (error) {
        return res.json({
            status: 400,
            message: error.message
        });
    }

}