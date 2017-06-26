var mongoose = require('mongoose');
var nh_articleSchema = require('./article.schema.server');
var nh_userModel = require('../user/user.model.server');
var nh_articleModel = mongoose.model('NH_ArticleModel', nh_articleSchema);


//api
nh_articleModel.saveArticle = saveArticle;
nh_articleModel.fetchArticlesByUserId = fetchArticlesByUserId;
nh_articleModel.fetchArticleById = fetchArticleById;
nh_articleModel.fetchArticlesCountByUserId = fetchArticlesCountByUserId;
nh_articleModel.updatePublishedArticle = updatePublishedArticle;
nh_articleModel.deleteArticle = deleteArticle;
nh_articleModel.fetchReportedArticles = fetchReportedArticles;


module.exports = nh_articleModel;

function fetchReportedArticles() {
    return nh_articleModel.find({reported:true});
}

function saveArticle(article) {
   return nh_articleModel.create(article)
       .then(function (article) {
           if(article.articleType ==='NEWS'){
               nh_userModel.addSavedArticleToUser(article._user,article._id);
               return article;
           }
           else{
               nh_userModel.addAuthoredArticlesToUser(article._user,article._id);
               return article;
           }
           //console.log(article._id);


       });
}


function fetchArticlesByUserId(userId,type) {
    return nh_articleModel.find({_user:userId,articleType:type});
}

function fetchArticleById(articleId) {
    return nh_articleModel.findById(articleId);
}

function updatePublishedArticle(articleId,article) {
    return nh_articleModel.update({_id:articleId},{$set:article});
}
function deleteArticle(articleId,userId,articleType) {
    return nh_articleModel.remove({_id:articleId})
        .then(function (msg) {
            if(articleType ==="NEWS"){
                nh_userModel.removeSavedArticlesFromUser(userId,articleId)
                return;
            }
            else{
                nh_userModel.removeAuthoredArticlesFromUser(userId,articleId);
                return;
            }
        });
}

function fetchArticlesCountByUserId(userId) {
     nh_articleModel.find({_user:userId}).exec(function (err,articles) {
        return articles.length;
    });
}
