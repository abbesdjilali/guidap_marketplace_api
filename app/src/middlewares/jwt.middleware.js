const jwt = require('jsonwebtoken');



exports.checkToken = (req, res, next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "my secret key", (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

exports.generateAccessToken = user =>{
    return jwt.sign(user, process.env.JWT_ACCESS_TOKEN_SECRET || "my secret key")
}
