/**
 * Created by Aditya on 5/28/2017.
 */
(function () {
    angular
        .module('NH')
        .config(userConfiguration);

    function userConfiguration($routeProvider) {
        $routeProvider

            .when('/login',{
                templateUrl:'views/user/templates/login.view.client.html',
                controller:'nh_loginController',
                controllerAs:'model'

            })
            .when('/register',{
                templateUrl:'views/user/templates/register.view.client.html',
                controller:'nh_registerController',
                controllerAs:'model'

            })
            .when('/profile',{
                templateUrl:'views/user/templates/profile.view.client.html',
                controller:'nh_profileController',
                controllerAs:'model',
                resolve: {
                    currentUser: checkLoggedIn
                }


            })


            .when('/user/search',{
                templateUrl:'views/user/templates/user.search.view.client.html',
                controller:'nh_userSearchController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/user/:username',{
                templateUrl:'views/user/templates/profile.view.client.html',
                controller:'nh_profileController',
                controllerAs:'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })



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