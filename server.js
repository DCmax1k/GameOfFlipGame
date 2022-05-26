const express = require('express');
const app = express();

require('dotenv').config();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('./models/User');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/client/build'));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html');
});

app.post('/checklogin', async (req, res) => {
    const token = req.cookies['auth-token'];
    if (token == null) return res.json({ status: 'error', message: 'No token provided' });
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.json({ status: 'error', message: 'Invalid token' });
        const user = await User.findOne({ _id: decoded._id });
        res.cookie('auth-token', token, { httpOnly: true, expires: new Date(Date.now() + 20 * 365 * 24 * 60 * 60 * 1000)});
        if (user.boughtApp) return res.json({ status: 'success', redirect: 'game', user });
        return res.json({ status: 'success', redirect: 'payment', user });
    });
})

const loginRoute = require('./routes/login');
app.use('/login', loginRoute);

const signupRoute = require('./routes/signup');
app.use('/signup', signupRoute);

const gameRoute = require('./routes/game');
app.use('/game', gameRoute);

const paymentRoute = require('./routes/payment');
app.use('/payment', paymentRoute);

app.listen(process.env.PORT || 3001, () => {
    console.log('Server listening on port 3001');
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(() => {
    console.log('Connected to MongoDB');
});