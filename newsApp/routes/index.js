const express = require('express');
const jwt = require("jsonwebtoken");
const Article = require('../schemas/article');
const router = express.Router();

router.get('/', async(req, res, next) => {
    let token = req.cookies["access-token"];
    let decode = jwt.verify(token, process.env.COOKIE_SECRET, (err, decoded) => {return err ? false : decoded;});
    let contents = [];
    let contentAll = await Article.find({})
    contentAll.forEach( (content, i) => { if(contentAll.length-5<=i){contents.push(content)} } )
    if(token && decode){
        res.render('main', {title: 'NewsPage', data: "login", contents : contents})
    }else{
        res.render('main', {title: 'NewsPage', data: "notLogin", contents : contents})
    }
  });
router.get('/login', (req, res) => {
    res.render('login', {title: 'LoginPage'})
});

router.get('/join', (req, res) => {
    res.render('join', {title : 'signUpPage'})
})

module.exports = router;