const User = require('../schemas/user');
const msg = require('../routes/errormsg');
const express = require('express');
const router = express.Router();

module.exports = function (passport) {
    router.post('/login',
        passport.authenticate('local', { 
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash : true,
            badRequestMessage: msg[40001]
        })
    );

    router.post('/join', async (req, res, next) =>{
        try{
            const isUser = await User.findOne({email: req.body.email});
            if(isUser){
                res.render('join', {err: msg[50001]})
            }else{
                let {email, name, password} = req.body
                let user = new User({ 
                    email : email,
                    name :  name,
                    password : password,
                    privilege : "normal" 
                })
                await user.save()
                res.redirect('/login')
            }   
        }catch(error){
            res.status(500).render('join', {err: msg[40002]})
        }
    })
    
    router.get('/logout', (req, res) => {
        req.logout();
        req.session.destroy((err) => {
            res.redirect('/')
        })
    })
    
    return router
}
