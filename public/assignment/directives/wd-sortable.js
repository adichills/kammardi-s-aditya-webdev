/**
 * Created by Aditya on 6/3/2017.
 */
(function () {
    angular
        .module('wbdvDirectives',['ngRoute'])
        .directive('wbdvSortable',wbdvSortable);

    function wbdvSortable() {


        function linkFunction(scope, element,attributes,directiveController) {
            element.sortable({
                start:function (event,ui) {
                    ui.item.startPosition = ui.item.index();
                    //console.log(ui.item.index());
                },
                update:function (event,ui) {
                    var sIndex = ui.item.startPosition;
                    var eIndex = ui.item.index();
                    ui.item.index
                    directiveController.reOrderWidgets(sIndex,eIndex);

                  //console.log(ui.item.index())
                },
                axis:'y',
                cursor:"move"
            });
        }

        return {
            link: linkFunction,
            controller:directiveController
            
        }
    };

    function directiveController(widgetService,$http,$routeParams) {
        var model = this;
        model.reOrderWidgets = reOrderWidgets;
        
        function reOrderWidgets(sIndex,eIndex) {
            var pageId = $routeParams['pageId'];

            widgetService.reOrderWidgets(pageId,sIndex,eIndex)
                .then(function () {
                    console.log("Updated the sort order of widgets");
                },function () {
                    console.log("Error while updating sort order of widgets");
                })
        }
    }
})();
