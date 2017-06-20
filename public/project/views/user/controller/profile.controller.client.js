/**
 * Created by Aditya on 5/25/2017.
 */
(function () {
    angular
        .module('NH')
        .controller('nh_profileController', nh_profileController);

    function nh_profileController(currentUser,$location,$routeParams,nh_userService) {

        var model = this;
        model.userId = currentUser._id;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        function init() {
            nh_userService
                .findUserByUserId(model.userId)
                .then(renderUser, userError);
        }
        init();

        //model.user = nh_userService.findUserByUserId(model.userId);




        function updateUser(userId,user) {
            nh_userService
                .updateUser(userId,user)
                .then(function () {
                    model.message = "Profile Update was successful";
                },function () {
                    model.message = "Error while updating profile";
                });
        }

        function renderUser (user) {
            model.user = user;
            nh_userService.findAllFollowingForUser(user._id)
                .then(function (following) {
                    model.following = following;
                });
            nh_userService.findAllFollowersForUser(user._id)
                .then(function (followers) {
                    model.followers = followers;
                })
        }

        function userError(error) {
            model.error = "User not found";
        }

        function deleteUser(userId) {
            nh_userService.deleteUser(userId)
                .then(logout(),
                function () {
                    model.message = "Error while un registering";
                })
        }



        function logout() {
            nh_userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

    }
})()