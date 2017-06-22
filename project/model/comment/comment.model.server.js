var mongoose = require('mongoose');
var nh_commentSchema = require('./comment.schema.server');
var nh_userModel = require('../user/user.model.server');
var nh_commentModel = mongoose.model('NH_CommentModel', nh_commentSchema);

//api

nh_commentModel.addComment = addComment;
nh_commentModel.fetchCommentsForArticle = fetchCommentsForArticle;

module.exports = nh_commentModel;

function addComment(comment) {
    return nh_commentModel.create(comment)
        .then(function (comment) {
            nh_userModel.addCommentsToUser(comment._user,comment._id);
                return comment;
        });
}

function fetchCommentsForArticle(articleId) {
    return nh_commentModel.find({_article:articleId})
        .populate('_user')
        .exec();
}
