/**
 * Created by Aditya on 1/18/2018.
 */
(function () {
    angular
        .module('PolisApiTest')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/api.test.view.html',
                controller: 'polisApiController',
                controllerAs: 'model'

            })
            .when('/list/:token',{
                templateUrl: 'views/api.test.list.view.html',
                controller: 'polisApiController',
                controllerAs: 'model'
            })
            .when('/contact/:token',{
                templateUrl: 'views/api.test.contact.view.html',
                controller: 'polisApiController',
                controllerAs: 'model'
            })


    }
})();