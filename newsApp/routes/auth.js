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

    router.post('/join', (req, res) => {
        console.log(req.body.email)
        // console.log(req.query)
        User.create({
            id : req.body.email,
            name :  req.body.nick,
            password : req.body.password,
            privilege : "normal"
        })
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

// module.exports = router;req.body.email