const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
  console.log(req.sessionID)
});

router.get('/join', (req, res) => {
    console.log("joinPage")
    res.render('join', {title : 'signUp page'})
})

module.exports = router;