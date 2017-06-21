/**
 * Created by Aditya on 5/28/2017.
 */
(function () {
    angular
        .module('NH')
        .config(dashBoardConfiguration);

    function dashBoardConfiguration($routeProvider) {
        $routeProvider

            .when('/dashboard',{
                templateUrl:'views/dashboard/templates/dashboard.view.client.html',
                controller:'nh_dashBoardController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }

            });




    }

    function checkCurrentUser($q, $location, nh_userService) {
        var deferred = $q.defer();

        nh_userService
            .loggedin()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkLoggedIn(nh_userService, $q, $location) {
        var deferred = $q.defer();

        nh_userService
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