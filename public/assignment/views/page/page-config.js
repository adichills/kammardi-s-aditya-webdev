/**
 * Created by Aditya on 5/28/2017.
 */
(function () {
    angular
        .module('WAM')
        .config(pageConfiguration);

    function pageConfiguration($routeProvider) {
        $routeProvider

            .when('/user/:userId/website/:websiteId/page',{
                templateUrl:'views/page/templates/page-list.view.client.html',
                controller:'pageListController',
                controllerAs:'model'

            })

            .when('/user/:userId/website/:websiteId/page/new',{
                templateUrl:'views/page/templates/page-new.view.client.html',
                controller:'pageNewController',
                controllerAs:'model'

            })

            .when('/user/:userId/website/:websiteId/page/:pageId',{
                templateUrl:'views/page/templates/page-edit.view.client.html',
                controller:'pageEditController',
                controllerAs:'model'

            })
    }

})()