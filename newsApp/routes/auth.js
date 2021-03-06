const User = require('../schemas/user');
const msg = require('../routes/errormsg');
const jwt = require("jsonwebtoken");
const express = require('express');
const middleware = require("../routes/middlewares");
const bcrypt = require('bcrypt-nodejs')
const router = express.Router();

module.exports = function () {
    router.post('/login', async (req, res) => {
        let { email, password } = req.body;
        const isUserId = await User.findOne({email: email});
        const isUserName = await User.findOne({email: email}).select('name')
        const opts = {}
        opts.expiresIn = 60 * 60 * 24 * 7;  
        const secret = process.env.COOKIE_SECRET; 
        let article = await middleware.articleArray();
        if(isUserName){
            const token = jwt.sign({ name : isUserName['name'], email : email }, secret, opts);
    
            bcrypt.compare(password, isUserId.password,  (err, isUserPw) => {
                if(isUserId && isUserPw){
                    res.cookie('access-token', token);
                    return res.redirect('/')
                }
                res.render('login', { err: msg["NO_PASSWORD"], article});
            })
        }else{
            res.render('login', { err: msg["NO_EMAIL"], article});
        }
    });


    router.post('/join', async (req, res) =>{
        let article = await middleware.articleArray();
        try{
            const isUser = await User.findOne({email: req.body.email});
            if(isUser){
                res.render('join', {err: msg["ALREADY_INFO"], article})
            }else{
                let {email, name, password} = req.body
                bcrypt.hash(password, null, null, async (err, hash) => {
                    let user = new User({ email, name, password : hash, privilege : "normal" })
                    await user.save()
                })
                res.redirect('/login')
            }   
        }catch(error){
            res.status(500).render('join', {err: msg["WRONG_INFO"], article})
        }
    })
    
    router.get('/logout', (req, res) => {
        res.clearCookie("access-token")
        return res.redirect('/')
    })
    
    return router
}
