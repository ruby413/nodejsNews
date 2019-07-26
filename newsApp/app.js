const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

// const pageRouter = require('./routes/index');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
// const connect = require('./schemas')

const app = express();
// connect()

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8001);

// app.use(function(req, res, next) {
//   res.render('index');
// });

app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(flash());

const authData = {
  email : "123",
  nick : "ruby",
  password : "123"
}
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, done) {
  console.log("serializeUser",user)
  done(null, user.email);
});

passport.deserializeUser(function(id, done) {
  console.log("deserializeUser",id)
  done(null, authData);
});

passport.use(new LocalStrategy(
  {
    usernameField : 'email',
    passwordField : 'password'
  },
  function(email, password, done) {
    if(email === authData.email){
      if(password === authData.password){
        return done(null, authData);
      }else{
        return done(null, false, { message: 'Incorrect password.' });
      }
    }else{
      return done(null, false, { message: 'Incorrect username.' });
    }
  }
));


app.post('/auth/login',
  passport.authenticate('local', { 
    successRedirect: '/',
    // failureRedirect: '/login',
    failureFlash : true
  })
);

app.use('/', indexRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});

