const express = require('express');
const Article = require('../schemas/article');
const middleware = require("../routes/middlewares");
const router = express.Router();

router.post('/', async (req, res)=>{
    let {email, name} = middleware.loginInfo(req, res)
    let {subject, image, contents} = req.body;
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
    let { _id, email, name, subject, image, contents, reportDate } = dataObject
    let login = middleware.loginCheck(req, res)
    res.render('post', { title: 'NewsPage', status : "post", email, name, login , subject, image, contents, reportDate })
})

module.exports = router;