const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cors = require('cors');

const User = require('../models/User');

const authToken = (req, res, next) => {
    const token = req.cookies['auth-token'];
    if (token == null) return res.json({ status: 'error', message: 'No token provided' });
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.json({ status: 'error', message: 'Invalid token' });
        const user = await User.findOne({ _id: decoded._id });
        res.cookie('auth-token', token, { httpOnly: true, expires: new Date(Date.now() + 20 * 365 * 24 * 60 * 60 * 1000)});
        if (user.rank === 'admin') return next();
        return res.status(401)
    });
}

const currentAppAlert = ['Welcome', 'Hope you enjoy playing, Flip Generator!']
router.get('/', cors(), (req, res) => {
    return res.json({ title: currentAppAlert[0], message: currentAppAlert[1] });
});

router.post('/update', authToken, (req, res) => {
    try {
        const { title, message } = req.body;
        currentAppAlert[0] = title;
        currentAppAlert[1] = message;
        return res.json({ status: 'success' });
    } catch(err) {
        console.error(err);
    }
});

module.exports = router;