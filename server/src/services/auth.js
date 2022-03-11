const jwt = require('jsonwebtoken');

function generateToken(id) {
    const { JWT_SECRET } = process.env;
    return jwt.sign({id}, JWT_SECRET, { expiresIn: '30m' });
}

function verifyToken(token) {
    const { JWT_SECRET } = process.env;
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    generateToken,
    verifyToken
}