/**
 * Created by Aditya on 5/28/2017.
 */
(function () {
    angular
        .module('WAM')
        .config(widgetConfiguration);

    function widgetConfiguration($routeProvider) {
        $routeProvider

            .when('/website/:websiteId/page/:pageId/widget',{
                templateUrl:'views/widget/templates/widget-list.view.client.html',
                controller:'widgetListController',
                controllerAs:'model',
                resolve: {
                    currentUser: checkLoggedIn
                }

            })

            .when('/website/:websiteId/page/:pageId/widget/new',{
                templateUrl:'views/widget/templates/widget-chooser.view.client.html',
                controller:'widgetNewController',
                controllerAs:'model',
                resolve: {
                    currentUser: checkLoggedIn
                }

            })
            .when('/website/:websiteId/page/:pageId/widget/:widgetId',{
                templateUrl:'views/widget/templates/widget-edit.view.client.html',
                controller:'widgetEditController',
                controllerAs:'model',
                resolve: {
                    currentUser: checkLoggedIn
                }

            })

            .when('/website/:websiteId/page/:pageId/widget/:widgetId/search',{
                templateUrl:'views/widget/templates/widget-flickr-search.view.client.html',
                controller:'FlickrImageSearchController',
                controllerAs:'model',
                resolve: {
                    currentUser: checkLoggedIn
                }

            })
    }

    function checkLoggedIn(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

})()