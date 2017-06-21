/**
 * Created by Aditya on 5/28/2017.
 */
(function () {
    angular
        .module('NH')
        .config(newsMediaConfiguration);

    function newsMediaConfiguration($routeProvider) {
        $routeProvider

            .when('/newsMediaSearch',{
                templateUrl:'views/newsmedia/templates/news.media.search.view.client.html',
                controller:'nh_newsMediaController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkCurrentUser
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