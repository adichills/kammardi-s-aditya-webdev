/**
 * Created by Aditya on 5/27/2017.
 */
(function () {
    angular.module('WAM')
        .controller('widgetEditController',widgetEditController);

    function widgetEditController($routeParams,$location,widgetService,$sce) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.editWidgetId = $routeParams['widgetId'];

        function init() {
            model.widgets = widgetService.findAllWidgetsForPage(model.pageId);
            model.editWidget = widgetService.findWidgetById(model.editWidgetId);
            model.editWidgetUrl = widgetUrl(model.editWidget);

        }
        init();


        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;


        function widgetUrl(widget) {
            var url = 'views/widget/editors/widget-'+widget.widgetType.toLowerCase()+'-edit.view.client.html';
            return url;
        }


        function updateWidget(widgetId,widget){
            widgetService.updateWidget(widgetId,widget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId + '/page/' + model.pageId + '/widget');
        }

        function deleteWidget(widgetId) {
            widgetService.deleteWidget(widgetId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId + '/page/' + model.pageId + '/widget');

        }
    }

})()
