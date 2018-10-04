const express = require('express');
const MongoClient = require('mongodb').MongoClient;
// const keys = require('./config/keys');
const bodyParser = require('body-parser');
const db = require('./config/db')
const app = express();
const passportSetup = require('./config/passport_setup');
const authRoutes = require('./app/routes/authroutes');
const mongoose = require('mongoose');   
const cookieSession = require('cookie-session');
const passport = require('passport');
require('dotenv').config();


const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true}))


app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SECRET] 
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res) => {
    if (!req.user) return;
    const obj = {
        user: req.user.username,
        id: req.user._id
    }
        res.send(obj)
})


app.use('/auth', authRoutes)

MongoClient.connect(db.url, (err, database) => {
    if (err) console.log(err);
    require('./app/routes')(app, database)  
app.listen(port, () => {
})
})

 //  app.use('/', express.static('./forumposts/build'));


mongoose.connect(db.url, () => {
    
})