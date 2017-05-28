/**
 * Created by Aditya on 5/27/2017.
 */
(function () {
    angular
        .module('WAM')
        .service('widgetService', widgetService);

    function widgetService() {
        this.findAllWidgetsForPage = findAllWidgetsForPage;
        this.findWidgetById = findWidgetById;
        this.deleteWidget = deleteWidget;
        this.createWidget = createWidget;
        this.updateWidget = updateWidget;

    var widgets = [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ]

        function createWidget(pageId,widget) {
            widget._id = (new Date()).getTime() + "";
            widget.pageId = pageId;
            widgets.push(widget);
            return widget._id;
        }

        function deleteWidget(widgetId) {
            var widget = findWidgetById(widgetId);
            var index = widgets.indexOf(widget);
            widgets.splice(index, 1);
        }

        function findWidgetById(widgetId) {
            return widgets.find(function (widget) {
                return widget._id === widgetId;
            });
        }
        function updateWidget(widgetId,widget) {
            for(var i in widgets){
                if(widgets[i]._id === widgetId){
                    widgets[i].widgetType = widget.widgetType;
                    if(widget.size!== null || typeof widget.size !== 'undefined'){
                        widgets[i].size = widget.size;
                    }
                    if(widget.width!== null || typeof widget.width !== 'undefined'){
                        widgets[i].width = widget.width;
                    }
                    if(widget.text!== null || typeof widget.text !== 'undefined'){
                        widgets[i].text = widget.text;
                    }


                }
            }
        }

        function findAllWidgetsForPage(pageId) {
            var results = [];

            for(var v in widgets) {
                if(widgets[v].pageId === pageId) {
                    results.push(widgets[v]);
                }
            }

            return results;
        }

    }
})()