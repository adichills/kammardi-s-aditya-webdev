var app = require('../../express');

var nh_commentModel = require('../model/comment/comment.model.server');


//api

app.get('/api/nh/comment/article/:articleId',fetchCommentsForArticle);
app.post('/api/nh/comment',addComment);
app.delete('/api/nh/comment/:commentId/:userId',removeComment);
app.put('/api/nh/comment/:commentId',updateComment);

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

function removeComment(req,res) {
    var commentId = req.params['commentId'];
    var userId = req.params['userId'];
    nh_commentModel.removeComment(commentId,userId)
        .then(function (msg) {
            res.sendStatus(200);
        },function (err) {
            res.send(err);
        })
}

function updateComment(req,res) {
    var commentId = req.params['commentId'];
    var comment = req.body;
    nh_commentModel.updateComment(commentId,comment)
        .then(function (comment) {
            res.json(comment);
        },function (err) {
            res.send(err);
        })
}

