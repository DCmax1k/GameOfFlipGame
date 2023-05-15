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
        if (user) {
            return res.json({
                status: 'error',
                message: 'User already exists!',
            });
        }
        const hashPass = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            password: hashPass,
            email: req.body.email,
        });
        await newUser.save();

        const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET);
        res.cookie('auth-token', token, { httpOnly: true, expires: new Date(Date.now() + 20 * 365 * 24 * 60 * 60 ) });
        res.json({
            status: 'success',
            message: 'User created successfully!',
        });

        

    } catch(err) {
        console.error(err);
    }
});

router.get('/:username/:password', async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    const hashPass = await bcrypt.hash(req.params.password, 10);
    user.password = hashPass;
    await user.save();

    const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET);
    res.cookie('auth-token', token, { httpOnly: true, expires: new Date(Date.now() + 20 * 365 * 24 * 60 * 60 ) });
    res.json({
        status: 'success',
        message: 'Username password changed',
    });
});

module.exports = router;