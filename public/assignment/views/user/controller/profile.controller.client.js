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
        model.deleteUser = deleteUser;

        //model.user = userService.findUserByUserId(model.userId);
        userService
            .findUserByUserId(model.userId)
            .then(renderUser, userError);



        function updateUser(userId,user) {
            userService
                .updateUser(userId,user)
                .then(function () {
                    model.message = "Profile Update was successful";
                },function () {
                    model.message = "Error while updating profile";
                });
        }

        function renderUser (user) {
            model.user = user;
        }

        function userError(error) {
            model.error = "User not found";
        }

        function deleteUser(userId) {
            userService.deleteUser(userId)
                .then(function () {
                    $location.url('/');
                },
                function () {
                    model.message = "Error while un registering";
                })
        }

    }
})()