const express = require('express');
const middleware = require("../routes/middlewares");
const router = express.Router();


router.get('/', async (req, res, next) => {
    let login = middleware.loginCheck(req, res)
    let article = await middleware.articleArray();
    res.render('main', { title: 'NewsPage', login, article })
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