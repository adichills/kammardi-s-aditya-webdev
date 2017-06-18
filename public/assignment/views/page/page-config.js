/**
 * Created by Aditya on 5/28/2017.
 */
(function () {
    angular
        .module('WAM')
        .config(pageConfiguration);

    function pageConfiguration($routeProvider) {
        $routeProvider

            .when('/website/:websiteId/page',{
                templateUrl:'views/page/templates/page-list.view.client.html',
                controller:'pageListController',
                controllerAs:'model',
                resolve: {
                    currentUser: checkLoggedIn
                }

            })

            .when('/website/:websiteId/page/new',{
                templateUrl:'views/page/templates/page-new.view.client.html',
                controller:'pageNewController',
                controllerAs:'model',
                resolve: {
                    currentUser: checkLoggedIn
                }

            })

            .when('/website/:websiteId/page/:pageId',{
                templateUrl:'views/page/templates/page-edit.view.client.html',
                controller:'pageEditController',
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