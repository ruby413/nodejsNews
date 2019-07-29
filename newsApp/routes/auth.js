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
    
    router.get('/login', (req, res) => {
        let flash = req.flash()
        res.render('login', {title: 'LoginPage', err: flash.error})
    });

    router.post('/login',
        passport.authenticate('local', { 
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash : true
        })
    );

    router.get('/join', (req, res) => {
        console.log("joinPage")
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

// module.exports = router;