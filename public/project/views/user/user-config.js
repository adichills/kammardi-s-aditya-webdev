(function () {
    angular
        .module('NH')
        .config(userConfiguration);

    function userConfiguration($routeProvider) {
        $routeProvider

            .when('/login',{
                templateUrl:'views/user/templates/login.view.client.html'
                // controller:'loginController',
                // controllerAs:'model'

            })
            .when('/register',{
                templateUrl:'views/user/templates/register.view.client.html'
                // controller:'registerController',
                // controllerAs:'model'

            })
            .when('/user/:userId',{
                templateUrl:'views/user/templates/profile.view.client.html'
                // controller:'profileController',
                // controllerAs:'model'

            })
    }

})()