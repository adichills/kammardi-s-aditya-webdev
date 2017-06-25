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
            .when('/profile/:mode',{
                templateUrl:'views/user/templates/manage.users.view.client.html',
                controller:'nh_manageUserController',
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
            .when('/profile/:mode/:username',{
                templateUrl:'views/user/templates/manage.users.view.client.html',
                controller:'nh_manageUserController',
                controllerAs:'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })

            .when('/admin',{
                templateUrl:'views/user/templates/admin.view.client.html',
                controller:'nh_adminController',
                controllerAs:'model',
                resolve: {
                    currentUser: checkAdmin
                 }
            })
            .when('/admin/user',{
                templateUrl:'views/user/templates/user.search.view.client.html',
                controller:'nh_adminUserSearchController',
                controllerAs:'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/manage/user/:mode/:username',{
                templateUrl:'views/user/templates/manage.users.view.client.html',
                controller:'nh_manageUserController',
                controllerAs:'model',
                resolve: {
                    currentUser: checkLoggedIn
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