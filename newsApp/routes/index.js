const express = require('express');
const auth = require('../lib/auth');

const router = express.Router();


router.get('/', (req, res, next) => {
    console.log("/",req.user)
    if(req.user){
        auth
        res.render('main', {title: 'NewsPage',})
    }else{
        res.render('login', {title: 'LoginPage',})
    }
  });


module.exports = router;