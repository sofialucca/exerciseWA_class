'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const examDao = require('./exam-dao'); // module for accessing the DB
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const userDao = require('./user-dao');
// init express
const app = express();
const port = 3001;

// set up the middlewares
app.use(morgan('dev'));
app.use(express.json()); // for parsing json request body
// set up and enable cors
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions));

//Passport set-up: local strategy
passport.use(new LocalStrategy(async function verify(username,password,cb){

  const user = userDao.getUser(username,password);
  if(!user)
    return cb(null,false); //when user not found with those credentials will generate an error at client level
  return cb(null,user);
}));

//what is saved in the sessionStorage
passport.serializeUser(function(user,cb){
  cb(null,user);
});

//what is retrieved from sessionStorage
passport.deserializeUser(function(user,cb){
  return cb(null,user);
});

//session set-up
app.use(session({
  secret: 'whatever',
  resave: false,
  saveUninitialized: false,
  //can specify storage different than default one
}));

app.use(passport.authenticate('session'));

//middleware

const isLoggedIn = (req,res,next) => {
  if(req.isAuthenticated())
    return next();

  return res.status(401).end();
}

//app.use(isLoggedIn); // to apply for entire server


/*** Exam APIs ***/

// GET /api/exams
app.get('/api/exams',isLoggedIn, (request, response) => {
  examDao.listExams()
  .then(exams => response.json(exams))
  .catch(() => response.status(500).end());
});
/*** User APIs ***/
app.post('/api/sessions',passport.authenticate('local'), (req,res) => {
  userDao.getUser(req.username, req.password);
  res.status(201).json(req.user);

});
/*** Other express-related instructions ***/

// activate the server
app.listen(port, () => console.log(`Server started at http://localhost:${port}.`));