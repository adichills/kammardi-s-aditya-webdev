var app = require('../../express');

var nh_commentModel = require('../model/comment/comment.model.server');


//api

app.get('/api/nh/comment/article/:articleId',fetchCommentsForArticle);
app.post('/api/nh/comment',addComment);

function addComment(req,res) {
    var newCommentObject = req.body;
    nh_commentModel.addComment(newCommentObject)
        .then(function (comment) {
            res.json(comment);
        },function (err) {
            res.send(err);
        })
}

function fetchCommentsForArticle(req,res) {
    var articleId = req.params['articleId'];
    nh_commentModel.fetchCommentsForArticle(articleId)
        .then(function (comments) {
            res.json(comments);
        },function (err) {
            res.send(err);
        })
}

