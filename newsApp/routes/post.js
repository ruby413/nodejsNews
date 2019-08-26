const express = require('express');
const Article = require('../schemas/article');
const middleware = require("../routes/middlewares");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post('/', async (req, res)=>{
    let {email, name} = middleware.loginInfo(req, res)
    let subject = req.body.subject;
    let image = req.body.image;
    let contents = req.body.contents;
    let article = new Article({ email, name, subject, image, contents})
    await article.save()
    let dataObject = await Article.find({})
    let dataObjectId = dataObject[dataObject.length-1]._id
    res.redirect(`/post/${dataObjectId}`)
})

router.get('/', (req, res)=>{
    let login = middleware.loginCheck(req, res)
    res.render('report', {
        title: 'Report', 
        status : "post",
        login
    })
})

router.get('/:id', async (req, res)=>{
    let dataObject = await Article.findOne({_id: req.params.id})
    let { _id, email, name, subject, image, contents } = dataObject
    let login = middleware.loginCheck(req, res)
    res.render('post', { title: 'NewsPage', status : "post", login , subject, image, contents })
})

module.exports = router;