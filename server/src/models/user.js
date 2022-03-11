const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email']
    },
    username: {
        type: String,
        required: [true, 'Please enter an username'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    role: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);

