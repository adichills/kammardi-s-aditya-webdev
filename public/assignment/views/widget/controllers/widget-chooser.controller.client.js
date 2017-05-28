/**
 * Created by Aditya on 5/27/2017.
 */
(function () {
    angular.module('WAM')
        .controller('widgetChooserController',widgetChooserController);

    function widgetChooserController($routeParams,$location,widgetService,$sce) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        function init() {
            model.widgets = widgetService.findAllWidgetsForPage(model.pageId);
        }
        init();


        model.createWidget = createWidget;

        function createWidget(widgetType) {
            var widget = {
                widgetType:widgetType
            }
            var widgetId = widgetService.createWidget(model.pageId,widget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId + '/page/' + model.pageId + '/widget/'+widgetId);

        }



    }

})()
