const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
  console.log(req.sessionID)
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        res.redirect('/')
    })
})

router.get('/join', (req, res) => {
    console.log("joinPage")
    res.render('join', {title : 'signUp page'})
})

module.exports = router;