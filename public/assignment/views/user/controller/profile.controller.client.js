/**
 * Created by Aditya on 5/25/2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location,$routeParams,userService) {

        var model = this;
        var userId = $routeParams['userId'];

        model.user = userService.findUserByUserId(userId);


    }
})()