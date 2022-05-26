const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    emailPIN: {
        type: Number,
        required: false,
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    dateJoined: {
        type: Date,
        default: Date.now
    },
    rank: {
        type: String,
        default: 'user'
    },
    boughtApp: {
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model('User', UserSchema);