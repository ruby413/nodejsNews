module.exports = function (app){
    const msg = require('../routes/errormsg');
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
            console.log(email)
            try{
                const isUser = await User.findOne({email: email});
                if(isUser){
                    if(isUser.password === password){
                        return done(null, isUser);
                    }else{
                        return done(null, false, { message: msg[60001]});
                    }
                }else{
                    return done(null, false, { message: msg[40001]});
                }
            }catch(error){
                done(error, false, { message: msg[40002] });
            }
        }
    ));
    
    return passport
}