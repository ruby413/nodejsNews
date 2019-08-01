module.exports = function (app){
    const User  = require("../schemas/user");
    const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize())
    app.use(passport.session())

    passport.serializeUser(function(user, done) {
        done(null, user.email);
    });

    passport.deserializeUser(function(email, done) {
        done(null, email);
    });

    passport.use(new LocalStrategy(
        {
            usernameField : 'email',
            passwordField : 'password'
        },
        async function(email, password, done) {
            const isUser = await User.findOne({email: email});
            const isPassword = isUser ? await isUser.password === password : false;
            if(isUser){
                if(isPassword){
                    return done(null, isUser);
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