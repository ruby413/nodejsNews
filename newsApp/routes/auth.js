const express = require('express');

const router = express.Router();

// router.get('/auth/login', (req, res) => {
//     let flash = req.flash()
//     res.render('login', {title: 'LoginPage', err: flash.error})
// });

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        res.redirect('/')
    })
})

router.get('/join', (req, res) => {
    console.log("joinPage")
    res.render('join', {title : 'signUp page'})
})

module.exports = router;