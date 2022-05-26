const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const path = require('path');
const bcrypt = require('bcrypt');

const User = require('../models/User');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.json({
                status: 'error',
                message: 'No user with that username!',
            });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.json({
                status: 'error',
                message: 'Incorrect password!',
            });
        }
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.cookie('auth-token', token, { httpOnly: true, expires: new Date(Date.now() + 20 * 365 * 24 * 60 * 60 * 1000)});

        if (user.boughtApp) {
            return res.json({
                status: 'success',
                message: 'User logged in successfully!',
                redirect: 'game',
            });
        } else {
            return res.json({
                status: 'success',
                message: 'User logged in successfully!',
                redirect: 'payment',
            });
        }
    } catch(err) {
        console.error(err);
    }
});

module.exports = router;