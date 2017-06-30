/**
 * Created by Aditya on 5/25/2017.
 */
(function () {
    angular
        .module('NH')
        .controller('nh_profileController', nh_profileController);
    //Not used anymore
    function nh_profileController(currentUser,$location,$routeParams,nh_userService) {

        var model = this;
        model.userId = currentUser._id;
        model.username = $routeParams['username'];
        model.allFieldsReadOnly = false;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.visitSavedArticleForProfile = visitSavedArticleForProfile;


        function init() {
            if(model.username ===null || typeof model.username ==='undefined'){
                nh_userService
                    .findUserByUserId(model.userId)
                    .then(renderUser, userError);
            }
            else{
                model.allFieldsReadOnly = true;
                nh_userService.findUserByUsername(model.username)
                    .then(renderUser,userError);
            }

        }
        init();

        //model.user = nh_userService.findUserByUserId(model.userId);

        function visitSavedArticleForProfile() {
            if (model.username === null || typeof model.username === 'undefined'){
                $location.url('/saved/article');
            }
            else{
                $location.url('/saved/article/'+model.username);
            }
        }


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