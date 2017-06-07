/**
 * Created by Aditya on 6/3/2017.
 */
(function () {
    angular
        .module('POC')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl:'all-sources.html',
                controller:'Controller1',
                controllerAs:'model'
            })
            .when('/dashboard/:newsMediaId/:sortBy',{
                templateUrl:'dashboard.html',
                controller:'Controller2',
                controllerAs:'model'
            })
            .when('/articles/:newsMediaId/:sortBy',{
                templateUrl:'Articles.html',
                controller:'Controller3',
                controllerAs:'model'
            })
    }

})()