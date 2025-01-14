const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const path = require('path');
const bcrypt = require('bcrypt');

const User = require('../models/User');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

router.post('/logout', async (req, res) => {
    try {
        res.cookie('auth-token', '', { expires: new Date(0) }).json({ status: 'success' });
    } catch(err) {
        console.error(err);
    }
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

router.post('/paidchange', authToken, async (req, res) => {
    try {
        const admin = await User.findById(req.userId);
        if (admin.rank !== 'admin') {
            return res.json({
                status: 'error',
                message: 'You are not an admin!',
            });
        }
        
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.json({
                status: 'error',
                message: 'No user with that username!',
            });
        }
        user.boughtApp = true;
        await user.save();
        return res.json({
            status: 'success',
            message: 'User has been gifted the app!',
        });

        
    } catch(err) {
        console.error(err);
    }
    
});

function authToken(req, res, next) {
    const token = req.cookies['auth-token'];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.userId = user._id;
        res.cookie('auth-token', token, { httpOnly: true, expires: new Date(Date.now() + 20 * 365 * 24 * 60 * 60 * 1000)});
        next();
    });
}

module.exports = router;