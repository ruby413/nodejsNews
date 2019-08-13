const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    if(req.cookies["access-token"]){
        res.render('main', {title: 'NewsPage', data: "login"})
    }else{
        res.render('main', {title: 'NewsPage', data: "notLogin"})
    }
  });
router.get('/login', (req, res) => {
    res.render('login', {title: 'LoginPage'})
});

router.get('/join', (req, res) => {
    res.render('join', {title : 'signUp page'})
})

module.exports = router;