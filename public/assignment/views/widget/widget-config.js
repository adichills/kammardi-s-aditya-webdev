/**
 * Created by Aditya on 5/28/2017.
 */
(function () {
    angular
        .module('WAM')
        .config(widgetConfiguration);

    function widgetConfiguration($routeProvider) {
        $routeProvider

            .when('/user/:userId/website/:websiteId/page/:pageId/widget',{
                templateUrl:'views/widget/templates/widget-list.view.client.html',
                controller:'widgetListController',
                controllerAs:'model'

            })

            .when('/user/:userId/website/:websiteId/page/:pageId/widget/new',{
                templateUrl:'views/widget/templates/widget-chooser.view.client.html',
                controller:'widgetNewController',
                controllerAs:'model'

            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId',{
                templateUrl:'views/widget/templates/widget-edit.view.client.html',
                controller:'widgetEditController',
                controllerAs:'model'

            })

            .when('/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/search',{
                templateUrl:'views/widget/templates/widget-flickr-search.view.client.html',
                controller:'FlickrImageSearchController',
                controllerAs:'model'

            })
    }

})()