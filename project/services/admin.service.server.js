var app = require('../../express');

var nh_commentModel = require('../model/comment/comment.model.server');
var nh_userModel = require('../model/user/user.model.server');
var nh_articleModel = require('../model/article/article.model.server');

app.get("/api/nh/admin/stats",getAdminStats);

function getAdminStats(req,res) {
    var stats = {}
    getUserStats(stats)
        .then(getCommentStats)
        .then(getSavedArticleStats)
        .then(getPublishedArticleStats)
        .then(getReportedCommentsStats)
        .then(getReportedArticleStats)
        .then(function (stats) {
            res.json(stats);
        })

}

function getUserStats(stats) {
    return nh_userModel.find()
        .then(function (users) {
            stats.usersCount = users.length;
            return stats;
        });
}

function getCommentStats(stats) {
    return nh_commentModel.find()
        .then(function (comments) {
            stats.commnetsCount = comments.length;
            return stats;
        });
}

function getReportedCommentsStats(stats) {
    return nh_commentModel.fetchReportedComments()
        .then(function (comments) {
            stats.reportedComments = comments.length;
            return stats;
        })
}
function getSavedArticleStats(stats) {
    return nh_articleModel.find({articleType:'NEWS'})
        .then(function (articles) {
            stats.savedarticlesCount = articles.length;
            return stats;
        });
}
function getPublishedArticleStats(stats) {
    return nh_articleModel.find({articleType:'PUBLISHER'})
        .then(function (articles) {
            stats.publishedarticlesCount = articles.length;
            return stats;
        });
}

function getReportedArticleStats(stats) {
    return nh_articleModel.fetchReportedArticles()
        .then(function (articles) {
            stats.reportedArticles = articles.length;
            return stats;
        });
}