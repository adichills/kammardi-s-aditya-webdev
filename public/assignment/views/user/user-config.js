/**
 * Created by Aditya on 5/28/2017.
 */
(function () {
    angular
        .module('WAM')
        .config(userConfiguration);

    function userConfiguration($routeProvider) {
        $routeProvider

            .when('/login',{
                templateUrl:'views/user/templates/login.view.client.html',
                controller:'loginController',
                controllerAs:'model'

            })
            .when('/register',{
                templateUrl:'views/user/templates/register.view.client.html',
                controller:'registerController',
                controllerAs:'model'

            })
            .when('/profile',{
                templateUrl:'views/user/templates/profile.view.client.html',
                controller:'profileController',
                controllerAs:'model',
                resolve: {
                    currentUser: checkLoggedIn
                }


            })



    }

    function checkCurrentUser($q, $location, userService) {
        var deferred = $q.defer();

        userService
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