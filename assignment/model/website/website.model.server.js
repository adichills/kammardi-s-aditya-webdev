var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
var userModel = require('../user/user.model.server');

//api
websiteModel.findAllWebsites = findAllWebsites;
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.updateWebsite = updateWebsite;

websiteModel.addPageForWebsite = addPageForWebsite;
websiteModel.deletePageFromWebsite = deletePageFromWebsite;

module.exports = websiteModel;

function addPageForWebsite(websiteId,pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        });
}

function deletePageFromWebsite(websiteId,pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        });
}

function createWebsiteForUser(userId, website) {
    website._user = userId;
    return websiteModel
        .create(website)
        .then(function (website) {
            return userModel
                .addWebsite(userId, website._id)
        })
}
function findAllWebsitesForUser(userId) {
    return websiteModel.find({_user:userId});
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function deleteWebsite(websiteId) {
    return websiteModel.findById(websiteId)
        .then(function (website) {
            var userId = website._user;
            return deleteWebsiteForUser(websiteId,userId)
        })
}

function deleteWebsiteForUser(websiteId,userId){
    return websiteModel.remove({_id:websiteId})
        .then(function (status) {
            return userModel.deleteWebsite(userId,websiteId);
        })

}
function updateWebsite(websiteId,website) {
    return websiteModel.update({_id:websiteId},{$set:website});
}

function findAllWebsites() {
    return websiteModel.find();
}