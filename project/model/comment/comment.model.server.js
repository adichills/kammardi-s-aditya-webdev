var mongoose = require('mongoose');
var nh_commentSchema = require('./comment.schema.server');
var nh_userModel = require('../user/user.model.server');
var nh_commentModel = mongoose.model('NH_CommentModel', nh_commentSchema);

//api

nh_commentModel.addComment = addComment;
nh_commentModel.fetchCommentsForArticle = fetchCommentsForArticle;
nh_commentModel.removeComment = removeComment;
nh_commentModel.updateComment = updateComment;
nh_commentModel.fetchReportedComments = fetchReportedComments;

module.exports = nh_commentModel;

function addComment(comment) {
    return nh_commentModel.create(comment)
        .then(function (comment) {
            nh_userModel.addCommentsToUser(comment._user,comment._id);
                return comment;
        });
}

function removeComment(commentId,userId) {
    return nh_commentModel.remove({_id:commentId})
        .then(function (msg) {
            nh_userModel.removeCommentsFromUser(userId,commentId);
            return msg;
        })
}

function updateComment(commentId,comment) {
    return nh_commentModel.update({_id:commentId},{$set:comment});
}

function fetchCommentsForArticle(articleId) {
    return nh_commentModel.find({_article:articleId})
        .populate('_user')
        .exec();
}

function fetchReportedComments() {
    return nh_commentModel.find({reported:true})
        .populate('_user')
        .exec();
}
