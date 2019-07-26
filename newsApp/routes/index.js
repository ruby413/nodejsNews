const express = require('express');

const router = express.Router();


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

module.exports = router;