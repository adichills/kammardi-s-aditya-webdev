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
    }

})()