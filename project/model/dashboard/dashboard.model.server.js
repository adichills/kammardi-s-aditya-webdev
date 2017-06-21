/**
 * Created by Aditya on 6/14/2017.
 */

var mongoose = require('mongoose');
var nh_dashBoardSchema = require('./dashboard.schema.server');
var nh_dashBoardModel = mongoose.model('NH_DashBoardModel', nh_dashBoardSchema);

//api
nh_dashBoardModel.createDashboard = createDashBoard;
nh_dashBoardModel.deleteDashBoard = deleteDashBoard;
nh_dashBoardModel.addNewsMedia = addNewsMedia;
nh_dashBoardModel.removeNewsMedia = removeNewsMedia;
nh_dashBoardModel.findDashBoardById = findDashBoardById;
nh_dashBoardModel.findDashBoardByUserId = findDashBoardByUserId;
nh_dashBoardModel.deleteDashBoardForUser = deleteDashBoardForUser;
nh_dashBoardModel.updateDashboard = updateDashboard;

module.exports = nh_dashBoardModel;

function findDashBoardByUserId(userId) {
    return nh_dashBoardModel.findOne({_user:userId});
}

function findDashBoardById(dashBoardId) {
    return nh_dashBoardModel.findById(dashBoardId);
}

function deleteDashBoardForUser(userId){
   return nh_dashBoardModel.remove({_user:userId});
}

function createDashBoard(userId) {
    var dashBoard = {
        _user:userId,
        news_media:[]
    }
    return nh_dashBoardModel.create(dashBoard);
}

function deleteDashBoard(dashBoardId) {
    return nh_dashBoardModel.remove({_id:user._id});
}

function updateDashboard(dashBoardId,dashboard) {
    return nh_dashBoardModel.update({_id:dashBoardId},{$set:dashboard});
}

function addNewsMedia(newsMediaId,dashBoardId) {
    return nh_dashBoardModel.findById(dashBoardId)
        .then(function (dashBoard) {
            dashBoard.news_media.push(newsMediaId);
            return dashBoard.save();
        })
}

function removeNewsMedia(newsMediaId,dashBoardId) {
    return nh_dashBoardModel.findById(dashBoardId)
        .then(function (dashBoard) {
            var index = dashBoard.news_media.find(newsMediaId);
            dashBoard.news_media.splice(index,1);
            return dashBoard.save();
        })
}

