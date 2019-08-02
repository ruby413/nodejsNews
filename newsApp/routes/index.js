const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    if(req.user){
        res.render('main', {title: 'NewsPage', data: "login"})
    }else{
        res.render('main', {title: 'NewsPage', data: "notLogin"})
    }
  });
router.get('/login', (req, res) => {
    let flash = req.flash()
    res.render('login', {title: 'LoginPage', err: flash.error})
});

router.get('/join', (req, res) => {
    res.render('join', {title : 'signUp page'})
})

module.exports = router;