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
nh_userModel.removeUserFromFollowing= removeUserFromFollowing;
nh_userModel.removeUserFromFollowers = removeUserFromFollowers;


module.exports = nh_userModel;

function removeUserFromFollowing(userId,followingId) {
    return nh_userModel.update({_id: userId}, {$pull: {following:followingId}});

}

function removeUserFromFollowers(userId,followersId) {
    return nh_userModel.update({_id: userId}, {$pull: {followers:followersId}});
}

function findUsersByIds(ids) {
    return nh_userModel.find({_id:{$in:ids}});
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