(function () {
    angular
        .module('NH')
        .config(commentConfiguration);

    function commentConfiguration($routeProvider) {
        $routeProvider

            .when('/manageComments',{
                templateUrl:'views/comment/templates/manage-comments.view.client.html',
                controller:'nh_manageCommentsController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkAdmin
                }

            });




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





})()