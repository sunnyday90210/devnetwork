const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');



const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');


const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());



// DB Config
const db = require('./config/keys').mongoURI;

// Connect to DB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


// Passport Middleweare
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/post', post);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));