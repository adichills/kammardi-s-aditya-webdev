(function () {
    angular
        .module('NH')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl:'home.html'
            })
    }

})()