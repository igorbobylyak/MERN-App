const express = require('express');
const bcrypt = require('bcrypt');
const { generateToken } = require('../services/auth');
const User = require('../models/user');
const { authOnly } = require('../middleware/auth');

const router = express.Router();

const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({message: `Please provide all fields!`});
    }

    try {
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message: `User with email ${email} already exists`});

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const user = await User.create({name, email, password: hashedPass, role: 'user'});

        return res.json({
            id: user.id, 
            name: user.name, 
            email: user.email,
            role: user.role, 
            token: generateToken(user.id)
        });
    } catch (err) {
        return next(err);
    }
}

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({message: 'Please provide email and password'});

    try {
        const user = await User.findOne({email});
        if (!user) return res.status(404).json({message: `User with email ${email} does not exist`});

        const correctPassword = await bcrypt.compare(password, user.password);

        if (user && correctPassword) {
            return res.json({
                id: user.id, 
                name: user.name, 
                email: user.email, 
                role: user.role,
                token: generateToken(user.id)
            });
        }

        return res.status(400).json({message: 'Wrong credentials'});
    } catch (err) {
        return next(err);
    }
}

const getMe = async (req, res, next) => {
    return res.json(req.user);
}

router.post('/registry', registerUser);
router.post('/login', loginUser);
router.get('/me', authOnly, getMe);

module.exports = router;