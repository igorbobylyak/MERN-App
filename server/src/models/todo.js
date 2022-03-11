const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        require: [true, 'Please enter todo`s title']
    },
    body: {
        type: String,
        required: [true, 'Please enter todo`s body']
    }
})

module.exports = mongoose.model('Todo', todoSchema);