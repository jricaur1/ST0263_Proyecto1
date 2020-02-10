const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport')

//Initialize the app
const app = express();

//Middlewares
//Form Data Middleware
app.use(bodyParser.urlencoded({extended:false}));

//Json body Middleware
app.use(bodyParser.json());

//Cors Middleware
app.use(cors());

//Setting up the static directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the passport Middleware
app.use(passport.initialize());
//Bringing the Strategy
require('./config/passport')(passport);

//Bringing the DB configuration and connect with Database
db = require('./config/keys').mongoURI;
mongoose.connect(db, {useNewUrlParser:true}).then(() => {
    console.log(`Database connected successfully ${db}`);
}).catch(err => console.log(`Unable to connect with Database ${err}`));

const users = require('./routes/api/users');
app.use('/api/users', users);

//Bringing the sensors route
const sensors = require('./routes/api/sensors');
app.use('/api/sensors', sensors);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})