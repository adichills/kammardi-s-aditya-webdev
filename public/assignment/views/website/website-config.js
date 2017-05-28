/**
 * Created by Aditya on 5/28/2017.
 */
(function () {
    angular
        .module('WAM')
        .config(websiteConfiguration);

    function websiteConfiguration($routeProvider) {
        $routeProvider

            .when('/user/:userId/website',{
                templateUrl:'views/website/templates/website-list.view.client.html',
                controller:'websiteListController',
                controllerAs:'model'

            })
            .when('/user/:userId/website/new',{
                templateUrl:'views/website/templates/website-new.view.client.html',
                controller:'websiteNewController',
                controllerAs:'model'

            })


            .when('/user/:userId/website/:websiteId',{
                templateUrl:'views/website/templates/website-edit.view.client.html',
                controller:'websiteEditController',
                controllerAs:'model'

            })
    }

})()