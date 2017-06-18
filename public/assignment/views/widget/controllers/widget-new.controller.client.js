/**
 * Created by Aditya on 5/27/2017.
 */
(function () {
    angular.module('WAM')
        .controller('widgetNewController',widgetNewController);

    function widgetNewController(currentUser,$routeParams,$location,widgetService,$sce) {
        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        function init() {
            widgetService.findAllWidgetsForPage(model.pageId)
                .then(renderWidgets);
        }
        init();

        function renderWidgets(widgets) {
            model.widgets = widgets;
        }

        model.createWidget = createWidget;

        function createWidget(widgetType) {
            var widget = {
                widgetType:widgetType
            }
            widgetService.createWidget(model.pageId,widget)
                .then(function (widget) {
                    console.log(widget);
                    $location.url('/website/'+model.websiteId + '/page/' + model.pageId + '/widget/'+widget._id);
                },function () {
                    model.message = "Error while creating a new widget";
                });


        }



    }

})()
