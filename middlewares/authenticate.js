const jwt = require('jsonwebtoken');
require('dotenv').config();

const key = process.env.JWT_SECRET;

module.exports = (req, res, next) => {

    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in" });
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, key, (err, user) => {
        if (err) {
            return res.status(403).json(err);
        }
        req.user = user;
        next();
    })

}