/**
 * Created by Aditya on 6/9/2017.
 */
var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel',pageSchema);
var websiteModel = require('../website/website.model.server');

//api

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

pageModel.addWidgetToPage = addWidgetToPage;
pageModel.deleteWidgetFromPage = deleteWidgetFromPage;

module.exports = pageModel;

function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function (page) {
            return websiteModel
                .addPageForWebsite(websiteId, page._id);
        })
}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website:websiteId});
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function updatePage(pageId,page) {
    return pageModel.update({_id:pageId},{$set:page});
}

function deletePage(pageId) {
    return pageModel.findById(pageId)
        .then(function (page) {
            var websiteId = page._website;
            return deletePageForWebsite(pageId,websiteId);
        })
}
function deletePageForWebsite(pageId,websiteId){
    return pageModel.remove({_id:pageId})
        .then(function (success) {
            return websiteModel.deletePageFromWebsite(websiteId,pageId);
        })
}

function addWidgetToPage(pageId,widgetId) {
    return pageModel.findPageById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        })
}

function deleteWidgetFromPage(pageId,widgetId) {
    return pageModel.findPageById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index,1);
            return page.save();
        })
}