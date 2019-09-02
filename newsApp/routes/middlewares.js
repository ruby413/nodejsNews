const Article = require('../schemas/article');
const User = require('../schemas/user');
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

exports.privilegeCheck = async (req, res) =>{
    let userInfo = await User.find({})
    let privilegeUser = [];
    let token = req.cookies["access-token"];
    if(token){
        let decode = jwt.verify(token, process.env.COOKIE_SECRET, (err, decoded) => {return err ? false : decoded;});
        userInfo.forEach( (user, i) => { user.email === decode.email ? privilegeUser.push(user) : false})
    }
    return privilegeUser
}