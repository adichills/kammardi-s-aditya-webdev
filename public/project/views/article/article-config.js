/**
 * Created by Aditya on 5/28/2017.
 */
(function () {
    angular
        .module('NH')
        .config(articleCondigurartion);

    function articleCondigurartion($routeProvider) {
        $routeProvider

            .when('/article/:articleId',{
                templateUrl:'views/article/templates/article.detail.view.client.html',
                controller:'nh_articleDetailController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkCurrentUser
                }

            })
            .when('/saved/article',{
                templateUrl:'views/article/templates/article.view.client.html',
                controller:'nh_savedArticleController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }

            })
            .when('/saved/article/:username',{
                templateUrl:'views/article/templates/article.view.client.html',
                controller:'nh_savedArticleController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }

            })
            .when('/publisher/article',{
                templateUrl:'views/article/templates/article.view.client.html',
                controller:'nh_publishedArticleController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }

            })
            .when('/publisher/article/:username',{
                templateUrl:'views/article/templates/article.view.client.html',
                controller:'nh_publishedArticleController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }

            })

            .when('/publisher/article/edit/:articleId',{
                templateUrl:'views/article/templates/publisher.edit.article.view.client.html',
                controller:'nh_publishedEditArticleController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
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