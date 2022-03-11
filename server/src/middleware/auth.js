const User = require('../models/user');
const { verifyToken } = require('../services/auth');

const authOnly = async (req, res, next) => {
    const { authorization } = req.headers;
    let token;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1];
            const decoded = verifyToken(token);

            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (err) {
            res.status(401).json({message: 'Unauthorized'});
            return next(err);
        }
    }

    if (!token) return res.status(401).json({message: 'Unauthorized'});
}

module.exports = { authOnly };