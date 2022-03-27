const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { authOnly } = require('../middleware/auth');

const router = express.Router();

const getUsers = async (req, res, next) => {
    try {
        const { user } = req;
        let users;
        if (user.role === 'admin') {
            users = await User.find().select('-password');
        } else {
            users = await User.find({role: 'user'}).select('-password');
        }
        return res.json(users);
    } catch (err) {
        return next(err);
    }
}

const createUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({message: `Please provide all fields!`});
    }

    try {
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message: `User with email ${email} already exists`});
        
        const newUser = { name, email };

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, 10);
        const user = await User.create({...newUser, password: hashedPass, role: 'user'});
        return res.status(201).json(user);
    } catch (err) {
        return next(err);
    }
}

const updateUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    const { id } = req.params;
    try {
        const user = await User.findById(id);

        if (!user) return res.status(404).json({message: `User with id ${id} does not exist`});

        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true});
        return res.json(updatedUser);
    } catch (err) {
        return next(err);
    }
}

const deleteUser = async (req, res, next) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({message: `User with id ${id} does not exist`});
    
    try {
        const user = await User.findById(id);

        if (!user) return res.status(404).json({message: `User with id ${id} does not exist`});

        await user.remove();

        return res.json(user);
    } catch (err) {
        return next(err);
    }
}

router.get('/', authOnly, getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;