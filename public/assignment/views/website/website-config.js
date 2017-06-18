/**
 * Created by Aditya on 5/28/2017.
 */
(function () {
    angular
        .module('WAM')
        .config(websiteConfiguration);

    function websiteConfiguration($routeProvider) {
        $routeProvider

            .when('/website',{
                templateUrl:'views/website/templates/website-list.view.client.html',
                controller:'websiteListController',
                controllerAs:'model',
                resolve: {
                    currentUser: checkLoggedIn
                }

            })
            .when('/website/new',{
                templateUrl:'views/website/templates/website-new.view.client.html',
                controller:'websiteNewController',
                controllerAs:'model',
                resolve: {
                    currentUser: checkLoggedIn
                }

            })


            .when('/website/:websiteId',{
                templateUrl:'views/website/templates/website-edit.view.client.html',
                controller:'websiteEditController',
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