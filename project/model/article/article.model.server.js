var mongoose = require('mongoose');
var nh_articleSchema = require('./article.schema.server');
var nh_userModel = require('../user/user.model.server');
var nh_articleModel = mongoose.model('NH_ArticleModel', nh_articleSchema);


//api
nh_articleModel.saveArticle = saveArticle;
nh_articleModel.fetchArticlesByUserId = fetchArticlesByUserId;
nh_articleModel.fetchArticleById = fetchArticleById;
nh_articleModel.fetchArticlesCountByUserId = fetchArticlesCountByUserId;

module.exports = nh_articleModel;

function saveArticle(article) {
   return nh_articleModel.create(article)
       .then(function (article) {
           //console.log(article._id);
           nh_userModel.addSavedArticleToUser(article._user,article._id);
           return article;
       });
}

function fetchArticlesByUserId(userId) {
    return nh_articleModel.find({_user:userId});
}

function fetchArticleById(articleId) {
    return nh_articleModel.findById(articleId);
}

function fetchArticlesCountByUserId(userId) {
     nh_articleModel.find({_user:userId}).exec(function (err,articles) {
        return articles.length;
    });
}
