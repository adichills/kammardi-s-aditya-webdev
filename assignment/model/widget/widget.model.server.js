/**
 * Created by Aditya on 6/9/2017.
 */
var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel',widgetSchema);
var pageModel = require('../page/page.model.server');

//api


widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;
widgetModel.getWidgetsByIds = getWidgetsByIds;


module.exports = widgetModel;

function createWidget(pageId,widget) {
    widget._page = pageId;
    return widgetModel.create(widget)
        .then(function (widget) {
            pageModel.addWidgetToPage(pageId,widget._id)
            return widget;
        })
}
function findAllWidgetsForPage(pageId) {
    return pageModel.findPageById(pageId)
        .then(function (page) {
            return page.widgets;
        })
}

function getWidgetsByIds(widgetIds) {
    return widgetModel.find(
        {_id:{$in:widgetIds}}
    )
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId,widget) {
    return widgetModel.update({_id:widgetId},{$set:widget});
}

function deleteWidget(widgetId) {
    return widgetModel.findById(widgetId)
        .then(function (widget) {
            var pageId = widget._page;
            deleteWidgetForPage(pageId,widgetId);
        })
}
function deleteWidgetForPage(pageId,widgetId) {
    return widgetModel.remove({_id:widgetId})
        .then(function (success) {
            return pageModel.deleteWidgetFromPage(pageId,widgetId);
        })
}

function reorderWidget(pageId,sIndex,eIndex) {
    return pageModel.findPageById(pageId)
        .then(function (page) {
            var widgets = page.widgets;

            widgets.splice(eIndex,0,widgets.splice(sIndex,1)[0]);
            page.widgets = widgets;
            return pageModel.updatePage(pageId,page);
        })
}
