const express = require('express')
const app = express();
const server=require('http').createServer(app)
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Enable CORS for cross-origin requests
const User = require('./models/User')
const userRoutes = require('./routes/userRoute'); // Import the user router module
const gameRoutes = require('./routes/gameRoutes'); // Import the game router module
const passport = require('passport'); // Import Passport.js
const session = require('express-session');// Import the authentication routes
require('./socket')(server)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(session({
    secret: process.env.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect('mongodb://127.0.0.1:27017/darcdb')

app.use('/users', userRoutes);
app.use('/game',gameRoutes);

app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
});

const port = 8000;

server.listen(port, ()=>{
    console.log(`The server is running at ${port}`)
})  