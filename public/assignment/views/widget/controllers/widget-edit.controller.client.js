/**
 * Created by Aditya on 5/27/2017.
 */
(function () {
    angular.module('WAM')
        .controller('widgetEditController',widgetEditController);

    function widgetEditController(currentUser,$routeParams,$location,widgetService,$sce) {
        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.editWidgetId = $routeParams['widgetId'];

        function init() {
            widgetService.findAllWidgetsForPage(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
            widgetService.findWidgetById(model.editWidgetId)
                .then(renderWidget);

            // console.log("Heyyy");
            // console.log(model.editWidget);



        }



        function renderWidget(widget) {
            model.editWidget = widget;
            // console.log(widget);
            // console.log(model.editWidget);
            model.editWidgetUrl = widgetUrl(model.editWidget);

        }

        init();


        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;


        function widgetUrl(widget) {
            console.log("Hey")
            //console.log(widget);
            var url = 'views/widget/editors/widget-'+widget.widgetType.toLowerCase()+'-edit.view.client.html';
            return url;
        }


        function updateWidget(widgetId,widget){

            if(typeof widget === 'undefined' ||widget.name===""|| widget.name === null || typeof widget.name === 'undefined'){
                model.error = "Widget name cannot be empty";
                return;
            }

            widgetService.updateWidget(widgetId,widget)
                .then(function () {
                    $location.url('/website/'+model.websiteId + '/page/' + model.pageId + '/widget');
                },function () {
                    model.message = "Error while updating the widget";
                });

        }

        function deleteWidget(widgetId) {
            widgetService.deleteWidget(widgetId)
                .then(function () {
                    $location.url('/website/'+model.websiteId + '/page/' + model.pageId + '/widget');
                },function () {
                    model.message = "Error while deleting the widget";
                });


        }
    }

})()
