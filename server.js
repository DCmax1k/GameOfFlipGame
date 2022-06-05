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
});

const currentAppAlert = ['Welcome', 'Hope you enjoy playing, Flip Generator!']
app.get('/appalert', cors(), () => {
    return res.json({ title: currentAppAlert[0], message: currentAppAlert[1] });
});

const loginRoute = require('./routes/login');
app.use('/login', loginRoute);

const signupRoute = require('./routes/signup');
app.use('/signup', signupRoute);

const gameRoute = require('./routes/game');
app.use('/game', gameRoute);

const paymentRoute = require('./routes/payment');
app.use('/payment', paymentRoute);

// STRIPE PAYMENTS
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
app.get('/stripesecret', async (req, res) => {
    const token = req.cookies['auth-token'];
    if (token == null) return res.json({ status: 'error', message: 'No token provided' });
    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET)
    const userID = decoded._id;
    const intent = await stripe.paymentIntents.create({
        amount: 99,
        currency: 'usd',
        automatic_payment_methods: {enabled: true},
        metadata: {
            userID: userID
        }
    });
    res.json({ status: 'success', client_secret: intent.client_secret });
});
app.post('/stripe/webhook', express.raw({type: 'application/json'}), (request, response) => {
    
    const event = request.body;
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
          console.log('payment succeeded');
        const paymentIntent = event.data.object;
        User.findOneAndUpdate({ _id: paymentIntent.metadata.userID }, { $set: { boughtApp: true } }, { new: true }, (err, user) => {
            if (err) return console.log(err);
        })

        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send();
});
app.get('/paymentsuccess', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html');
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(() => {
    console.log('Connected to MongoDB');
});


app.listen(process.env.PORT || 80, () => {
    console.log('Server listening on port 3001');
});