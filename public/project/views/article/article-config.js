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
            .when('/newsMedia/article/:newsMediaId/:sortBy/:name',{
                templateUrl:'views/article/templates/article.view.client.html',
                controller:'nh_newsMediaArticleController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkCurrentUser
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
            .when('/publisher/article/edit/:articleId/search',{
                templateUrl:'views/article/templates/article.flicker.search.view.client.html',
                controller: 'nh_FlickrImageSearchController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkLoggedIn
                }

            })
            .when('/manageArticles',{
                templateUrl:'views/article/templates/article.view.client.html',
                controller: 'nh_adminArticleController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkAdmin
                }

            })






    }

    function checkAdmin($q,$location,nh_userService) {
        var deferred = $q.defer();

        nh_userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    if(typeof user.role ==='undefined' || user.role === null || user.role.length ===0){
                        deferred.reject();
                        $location.url('/login');
                    }
                    else{
                        var index = user.role.indexOf('ADMIN');
                        if (index > -1){
                            deferred.resolve(user);
                        }
                        else{
                            deferred.reject();
                            $location.url('/login');
                        }
                    }

                }
            });

        return deferred.promise;
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