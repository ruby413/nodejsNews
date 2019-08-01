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
            try{
                const isUser = await User.findOne({email: email});
                if(isUser){
                    if(isUser.password === password){
                        return done(null, isUser);
                    }else{
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                }else{
                    return done(null, false, { message: 'Incorrect email.' });
                }
            }catch(error){
                done(error, false, { message: '서버 에러가 발생했습니다. 관리자에게 문의해주세요.' });
            }
        }
    ));
    
    return passport
}