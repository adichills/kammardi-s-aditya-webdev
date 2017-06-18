/**
 * Created by Aditya on 5/25/2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController(currentUser,$location,$routeParams,userService) {

        var model = this;
        model.userId = currentUser._id;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

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
                .then(logout(),
                function () {
                    model.message = "Error while un registering";
                })
        }



        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

    }
})()