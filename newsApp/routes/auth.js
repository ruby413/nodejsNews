const User = require('../schemas/user');
const express = require('express');
const router = express.Router();

module.exports = function (passport) {
    router.get('/', (req, res, next) => {
        if(req.user){
            res.render('main', {title: 'NewsPage', data: req.user.nick})
        }else{
        res.redirect('/login')
        }
    });

    router.post('/login',
        passport.authenticate('local', { 
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash : true
        })
    );

    router.post('/join', async (req, res) =>{
        // const isUser = await User.findOne({email: req.body.email});
        // if(isUser){
        //     // req.flash('signUpError', '이미 가입된 이메일입니다.');
        // }else{

        // }       
        // User.create({
        //     email : req.body.email,
        //     name :  req.body.nick,
        //     password : req.body.password,
        //     privilege : "normal"
        // })
        let {email, nick, password} = req.body
        console.log(email, nick, password)
        let user = new User({ 
            email : email,
            name :  nick,
            password : password,
            privilege : "normal" 
        })
        user.save()
        // console.log(user)
        res.render('join', {title : 'signUp page'})
    })
    
    router.get('/logout', (req, res) => {
        req.logout();
        req.session.destroy((err) => {
            res.redirect('/')
        })
    })
    
    return router
}
