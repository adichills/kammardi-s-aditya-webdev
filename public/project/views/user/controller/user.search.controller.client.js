/**
 * Created by Aditya on 5/25/2017.
 */
(function () {
    angular
        .module('NH')
        .controller('nh_userSearchController', nh_userSearchController);

    function nh_userSearchController(currentUser,$location,$routeParams,nh_userService) {

        var model = this;

        function initializeParameters() {
            model.userId = currentUser._id;
            model.user = currentUser;

        }
        initializeParameters();

        model.searchUser = searchUser;
        model.follow = follow;
        model.unfollow = unfollow;
        model.userDetail = userDetail;

        function userDetail(username) {
            $location.url("/profile/view/" + username);
        }


        function searchUser(username) {
            if (username === null || username ==='' || typeof username ==='undefined'){
                nh_userService.findAllUsers()
                    .then(function (users) {
                        model.users = users;
                        model.users = prepareUserList(model.users);
                    })
            }
            else{
                nh_userService.findUserByUsername(username)
                    .then(function (user) {
                        model.users = []
                        model.users.push(user);
                        model.users = prepareUserList(model.users);
                    })
            }
        }

        function isInArray(value, array) {
            return array.indexOf(value) > -1;
        }

        function prepareUserList(users){
            var preparedUsers = []
            for (var u in users){
                var renderedUser = users[u];
                if(isInArray(renderedUser._id,model.user.following)){
                    renderedUser.unfollow = true;
                }
                else{
                    renderedUser.unfollow = false;
                }

                if(renderedUser.username === model.user.username){
                    renderedUser.displayFollowOptions = false;
                }
                else{
                    renderedUser.displayFollowOptions = true;
                }
                preparedUsers.push(renderedUser);
            }
            return preparedUsers;
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

        function follow(tobeFollowedUser){
            tobeFollowedUser.followers.push(model.userId);
            model.user.following.push(tobeFollowedUser._id);
            nh_userService
                .updateUser(tobeFollowedUser._id,tobeFollowedUser)
                .then(function () {
                    nh_userService.updateUser(model.userId,model.user)
                        .then(function () {
                            searchUser(model.searchText);
                        })
                })
        }

        function unfollow(tobeUnFollowedUser) {
            var index = tobeUnFollowedUser.followers.indexOf(model.userId);
            tobeUnFollowedUser.followers.splice(index,1);
            index = model.user.following.indexOf(tobeUnFollowedUser._id);
            model.user.following.splice(index,1);
            nh_userService
                .updateUser(tobeUnFollowedUser._id,tobeUnFollowedUser)
                .then(function () {
                    nh_userService.updateUser(model.userId,model.user)
                        .then(function () {
                            searchUser(model.searchText);
                        })
                })


        }


        function renderUser (user) {
            model.user = user;
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





    }
})()