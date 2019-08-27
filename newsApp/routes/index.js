const express = require('express');
const middleware = require("../routes/middlewares");
const router = express.Router();


router.get('/', async (req, res, next) => {
    let login = middleware.loginCheck(req, res)
    let article = await middleware.articleArray();
    let privilegeUser = await middleware.privilegeCheck(req, res);
    let privilege = privilegeUser[0] ? privilegeUser[0].privilege : false;
    res.render('main', { title: 'NewsPage', login, article, privilege})
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