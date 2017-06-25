(function () {
    angular
        .module('NH')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl:'views/newsmedia/templates/news.media.search.view.client.html',
                controller:'nh_newsMediaController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkCurrentUser
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

})()