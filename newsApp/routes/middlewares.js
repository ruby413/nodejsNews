exports.articleArray = async () => {
    const Article = require('../schemas/article');
    let article = [];
    let contentAll = await Article.find({})
    contentAll.forEach( (content, i) => { if(contentAll.length-5<=i){article.push(content)} } )
    return article
}
