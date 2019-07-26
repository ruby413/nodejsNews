const express = require('express');

const router = express.Router();


router.get('/', (req, res, next) => {
    if(req.user){
        res.render('main', {title: 'NewsPage', data: req.user.nick})
    }else{
        res.render('login', {title: 'LoginPage',})
    }
  });


module.exports = router;