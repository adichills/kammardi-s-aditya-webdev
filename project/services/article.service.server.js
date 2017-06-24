var app = require('../../express');

var nh_articleModel = require('../model/article/article.model.server');

//api
app.post("/api/nh/article",saveArticle);
app.get("/api/nh/article/:userId/:type",fetchArticlesByUserId);
app.get("/api/nh/savedArticle/:articleId",fetchArticleById);
app.put("/api/nh/publishedArticle/:articleId",updatePublishedArticle);
app.delete("/api/nh/publishedArticle/:articleId",deletePublishedArticle);


function saveArticle(req,res) {
    var article = req.body;
    nh_articleModel.saveArticle(article)
        .then(function (article) {
            res.json(article);
        },function (err) {
            res.send(err);
        })
}

function updatePublishedArticle(req,res) {
    var articleId = req.params['articleId'];
    var article = req.body;
    nh_articleModel.updatePublishedArticle(articleId,article)
        .then(function (article) {
            res.json(article);
        },function (err) {
            res.send(err);
        })
}

function deletePublishedArticle(req,res) {
    var articleId = req.params['articleId'];
    nh_articleModel.deletePublishedArticle(articleId)
        .then(function () {
            res.sendStatus(200);
        },function (err) {
            res.send(err);
        })
}

function fetchArticlesByUserId(req,res) {
    var userId = req.params['userId'];
    var type = req.params['type'];
    nh_articleModel.fetchArticlesByUserId(userId,type)
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
