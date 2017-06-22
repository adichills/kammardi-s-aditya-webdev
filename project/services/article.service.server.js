var app = require('../../express');

var nh_articleModel = require('../model/article/article.model.server');

//api
app.post("/api/nh/article",saveArticle);
app.get("/api/nh/article/:userId",fetchArticlesByUserId);
app.get("/api/nh/savedArticle/:articleId",fetchArticleById);


function saveArticle(req,res) {
    var article = req.body;
    nh_articleModel.saveArticle(article)
        .then(function (article) {
            res.json(article);
        },function (err) {
            res.send(err);
        })
}

function fetchArticlesByUserId(req,res) {
    var userId = req.params['userId'];
    nh_articleModel.fetchArticlesByUserId(userId)
        .then(function (articles) {
            res.json(articles);
        },function (err) {
            res.send(err);
        })
}

function fetchArticleById(req,res) {
    var articleId = req.params['articleId'];
    nh_articleModel.fetchArticleById(articleId)
        .then(function (article) {
            res.json(article);
        },function (err) {
            res.send(err);
        })
}
