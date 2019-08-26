const express = require('express');
const jwt = require("jsonwebtoken");
const middleware = require("../routes/middlewares");
const router = express.Router();


router.get('/', async (req, res, next) => {
    let token = req.cookies["access-token"];
    let decode = jwt.verify(token, process.env.COOKIE_SECRET, (err, decoded) => {return err ? false : decoded;});
    let article = await middleware.articleArray();
    if(token && decode){
        res.render('main', {
            title: 'NewsPage', 
            data: "login", 
            article
        })
    }else{
        res.render('main', {
            title: 'NewsPage', 
            data: "notLogin", 
            article
        })
    }
  });
router.get('/login', async (req, res) => {
    let article = await middleware.articleArray();
    res.render('login', {title: 'LoginPage', article})
});

router.get('/join', async (req, res) => {
    let article = await middleware.articleArray();
    res.render('join', {title : 'SignUpPage', article})
})

module.exports = router;