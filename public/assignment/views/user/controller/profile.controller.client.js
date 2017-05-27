/**
 * Created by Aditya on 5/25/2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location,$routeParams,userService) {

        var model = this;
        model.userId = $routeParams['userId'];

        model.updateUser = updateUser;

        model.user = userService.findUserByUserId(model.userId);


        function updateUser(userId,user) {
            userService.updateUser(userId,user);
        }

    }
})()