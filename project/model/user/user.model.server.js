/**
 * Created by Aditya on 6/9/2017.
 */
var mongoose = require('mongoose');
var nh_userSchema = require('./user.schema.server');
var nh_userModel = mongoose.model('NH_UserModel', nh_userSchema);
var nh_dashBoardModel = require('../dashboard/dashboard.model.server');

//api
nh_userModel.createUser = createUser;
nh_userModel.findUserById = findUserById;
nh_userModel.findAllUsers = findAllUsers;
nh_userModel.findUserByUsername = findUserByUsername;
nh_userModel.findUserByCredentials = findUserByCredentials;
nh_userModel.updateUser = updateUser;
nh_userModel.deleteUser = deleteUser;
nh_userModel.findUsersByIds = findUsersByIds;
nh_userModel.findFollowersForUser = findFollowersForUser;
nh_userModel.findFollowingForUser = findFollowingForUser;
nh_userModel.addremoveUserFromFollowing= addremoveUserFromFollowing;
nh_userModel.addremoveUserFromFollowers = addremoveUserFromFollowers;
nh_userModel.findUserByFacebookId = findUserByFacebookId;
nh_userModel.addSavedArticleToUser = addSavedArticleToUser;
nh_userModel.addAuthoredArticlesToUser = addAuthoredArticlesToUser;
nh_userModel.removeSavedArticlesFromUser = removeSavedArticlesFromUser;
nh_userModel.addCommentsToUser = addCommentsToUser;
nh_userModel.removeCommentsFromUser = removeCommentsFromUser;
nh_userModel.changePassword = changePassword;
nh_userModel.removeAuthoredArticlesFromUser = removeAuthoredArticlesFromUser;

module.exports = nh_userModel;


function findUserByFacebookId(facebookId) {
    return nh_userModel.findOne({'facebook.id': facebookId});
}

function addremoveUserFromFollowing(userId,followingId,mode) {
    if (mode === 'add'){
        return nh_userModel.update({_id: userId}, {$push: {following:followingId}})
    }
    else{
        return nh_userModel.update({_id: userId}, {$pull: {following:followingId}});
    }

}

function addremoveUserFromFollowers(userId,followersId,mode) {
    if (mode ==='add'){
        return nh_userModel.update({_id: userId}, {$push: {followers:followersId}});
    }
    else{
        return nh_userModel.update({_id: userId}, {$pull: {followers:followersId}});
    }
}

function findUsersByIds(ids) {
    return nh_userModel.find({_id:{$in:ids}});
}

function addSavedArticleToUser(userId,articleId) {
    return nh_userModel.findById(userId)
        .then(function (user) {
            user.savedArticles.push(articleId);
            return user.save();
        })
}

function addAuthoredArticlesToUser(userId,articleId) {
    return nh_userModel.findById(userId)
        .then(function (user) {
            user.authoredArticles.push(articleId);
            return user.save();
        })
}
function removeAuthoredArticlesFromUser(userId,articleId) {
    return nh_userModel.findById(userId)
        .then(function (user) {
            var index = user.authoredArticles.indexOf(articleId);
            user.authoredArticles.splice(index,1);
            return user.save();
        })
}

function removeSavedArticlesFromUser(userId,articleId) {
    return nh_userModel.findById(userId)
        .then(function (user) {
            var index = user.savedArticles.indexOf(articleId);
            user.savedArticles.splice(index,1);
            return user.save();
        })
}
function addCommentsToUser(userId,commentId){
    return nh_userModel.findById(userId)
        .then(function (user) {
            user.comments.push(commentId)
            return user.save();
        })
}

function removeCommentsFromUser(userId,commentId) {
    return nh_userModel.findById(userId)
        .then(function (user) {
            var index = user.comments.indexOf(commentId);
            user.comments.splice(index,1);
            return user.save();
        })
}

function findFollowersForUser(userId) {
    return nh_userModel.findById(userId)
        .then(function (user) {
            return nh_userModel.find({_id:{$in:user.followers}})

        })
}

function findFollowingForUser(userId) {
    return nh_userModel.findById(userId)
        .then(function (user) {
            return nh_userModel.find({_id:{$in:user.following}})
                .populate('savedArticles')
                .exec();

        })
}

function createUser(user) {
    return nh_userModel.create(user)
        .then(function (user) {
           return nh_dashBoardModel.createDashboard(user._id)
                .then(function () {
                    return user;
                });

        });
}

function findUserById(userId) {
    return nh_userModel.findById(userId);
}

function findAllUsers() {
    return nh_userModel.find();
}

function findUserByUsername(username) {
    return nh_userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return nh_userModel.findOne({username: username, password: password});
}

function updateUser(userId, newUser) {
    delete newUser.username;
    delete newUser.password;
    return nh_userModel.update({_id: userId}, {$set: newUser});
}

function deleteUser(userId) {
    return nh_dashBoardModel.findDashBoardByUserId(userId)
        .then(function () {
            return nh_userModel.remove({_id:userId});
        })

}

function changePassword(userId,password) {
    return nh_userModel.findById(userId)
        .then(function (user) {
            user.password = password
            return user.save();
        })
}