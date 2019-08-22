const express = require('express');
const jwt = require("jsonwebtoken");
const Article = require('../schemas/article');
const router = express.Router();

router.get('/', async(req, res, next) => {
    let token = req.cookies["access-token"];
    let decode = jwt.verify(token, process.env.COOKIE_SECRET, (err, decoded) => {return err ? false : decoded;});
    let article = [];
    let contentAll = await Article.find({})
    contentAll.forEach( (content, i) => { if(contentAll.length-5<=i){article.push(content)} } )
    if(token && decode){
        console.log(article[0])
        res.render('main', {title: 'NewsPage', data: "login", article : article})
    }else{
        console.log(article[0])

        res.render('main', {title: 'NewsPage', data: "notLogin", article : article})
    }
  });
router.get('/login', (req, res) => {
    res.render('login', {title: 'LoginPage'})
});

router.get('/join', (req, res) => {
    res.render('join', {title : 'signUpPage'})
})

module.exports = router;