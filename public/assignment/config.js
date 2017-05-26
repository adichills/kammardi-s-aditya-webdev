/**
 * Created by Aditya on 5/25/2017.
 */
(function () {
    angular
        .module('WAM')
        .config(configuration);
    
    function configuration($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl:'home.html'
            })
            .when('/login',{
                templateUrl:'views/user/templates/login.view.client.html',
                controller:'loginController',
                controllerAs:'model'

            })
            .when('/register',{
                templateUrl:'views/user/templates/register.view.client.html'
                // controller:'loginController',
                // controllerAs:'model'

            })
            .when('/user/:userId',{
                templateUrl:'views/user/templates/profile.view.client.html',
                controller:'profileController',
                controllerAs:'model'

            })
    }

})()