const jwt = require('jsonwebtoken')
const SecretKey = 'MERNdeveloper'

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        jwt.verify(token, SecretKey)
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}

module.exports = auth;
