const express = require('express');
const Todo = require('../models/todo');
const User = require('../models/user');
const { authOnly } = require('../middleware/auth');

const router = express.Router();

const getTodosController = async (req, res, next) => {
    try {
        const todos = await Todo.find({user: req.user.id});
        return res.json(todos);
    } catch (err) {
        return next(err);
    }
}

const createTodoController = async (req, res, next) => {
    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(400).json({message: 'Please provide title and body'});
    }

    try {
        const todo = await Todo.create({
            title,
            body,
            user: req.user.id
        });

        return res.json(todo);
    } catch (err) {
        return next(err);
    }
}

const updateTodoController = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({message: 'Id is undefined'});
    }

    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({message: 'Todo not found'});
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({message: 'Unathorized'});
        }

        if (todo.user.toString() !== user.id) {
            return res.status(401).json({message: 'Not Authorized'});
        }

        const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {new: true});
        return res.json(updatedTodo);
    } catch (err) {
        return next(err);
    }
}

const deleteTodoController = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({message: 'Id is undefined'});
    }

    try {
        const todo = await Todo.findById(id);
        if (!todo) return res.status(404).json({message: `Todo with id ${id} not found`});

        const user = await User.findById(req.user.id);
        if (!user) return res.status(401).json({message: `Unauthorized`});

        if (todo.user.toString() !== user.id) {
            return res.status(401).json({message: 'Unauthorized'});
        }

        const deletedTodo = await Todo.findByIdAndDelete(id);
        return res.json(deletedTodo);
    } catch (err) {
        return next(err);
    }
}

router.get('/', authOnly, getTodosController);
router.post('/', authOnly, createTodoController);
router.put('/:id', authOnly, updateTodoController);
router.delete('/:id', authOnly, deleteTodoController);

module.exports = router;