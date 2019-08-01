const User = require('../schemas/user');
const express = require('express');
const router = express.Router();

module.exports = function (passport) {
    router.post('/login',
        passport.authenticate('local', { 
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash : true
        })
    );

    router.post('/join', async (req, res, next) =>{
        try{
            const isUser = await User.findOne({email: req.body.email});
            if(isUser){
                res.render('join', {err: "이미 메일계정이 등록되어 있습니다."})
            }else{
                let {email, name, password} = req.body
                let user = new User({ 
                    email : email,
                    name :  name,
                    password : password,
                    privilege : "normal" 
                })
                await user.save()
                res.render('join', {title : 'signUp page'})
            }   
        }catch(error){
            console.log(error)
            res.status(500).render('join', {err: "서버 에러가 발생했습니다. 관리자에게 문의해주세요."})
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
