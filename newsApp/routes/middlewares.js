const Article = require('../schemas/article');
const jwt = require("jsonwebtoken");

exports.articleArray = async () => {
    let article = [];
    let contentAll = await Article.find({})
    contentAll.forEach( (content, i) => { if(contentAll.length-5<=i){article.push(content)} } )
    return article
}

exports.loginCheck = (req, res) => {
    let token = req.cookies["access-token"];
    let decode = jwt.verify(token, process.env.COOKIE_SECRET, (err, decoded) => {return err ? false : decoded;});
    return token && decode ? "login" : null
}

exports.loginInfo = (req, res) => {
    let token = req.cookies["access-token"];
    let decode = jwt.verify(token, process.env.COOKIE_SECRET, (err, decoded) => {return err ? false : decoded;});
    let email = decode.email
    let name = decode.name
    return {email, name}
}