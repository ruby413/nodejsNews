module.exports = function (app){
    const authData = {
    email : "123",
    nick : "ruby",
    password : "123"
    }
    const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize())
    app.use(passport.session())

    passport.serializeUser(function(user, done) {
    done(null, user.email);
    });

    passport.deserializeUser(function(id, done) {
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
            return done(null, false, { message: 'Incorrect email.' });
            }
        }
    ));

    return passport
}