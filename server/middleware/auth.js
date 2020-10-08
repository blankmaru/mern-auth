const jwt = require('jsonwebtoken');
const config = require('../config/keys');

const auth = async(req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(400).send('Access Denied');

    try {
        const verified = jwt.verify(token, config.jwtSecret);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}
module.exports = auth;