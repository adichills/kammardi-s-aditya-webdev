(function () {
    angular
        .module("NH")
        .controller("nh_manageUserController",nh_manageUserController);

    function nh_manageUserController(currentUser,$location,$routeParams,nh_userService,$route) {

        var model = this;
        model.mode = $routeParams["mode"];
        model.headerText = "Manage Users";

        model.createNewUser = createNewUser;
        model.addRole = addRole;
        model.removeRole = removeRole;
        model.updateUser = updateUser;
        model.allowPasswordChange = allowPasswordChange;
        model.changePassword = changePassword;
        model.deleteUser = deleteUser;
        model.addremoveUserFromFollowers = addremoveUserFromFollowers;
        model.addremoveUserFromFollowing = addremoveUserFromFollowing;


        function createNewUser(user) {
            if(user.username === null || user.username === '' || typeof user.username === 'undefined'){
                model.error = "username field cannot be empty";
                return;
            }
            if(user.password === null || user.password === '' || typeof user.password === 'undefined'){
                model.error = "username field cannot be empty";
                return;
            }
            if(user.role === null || typeof  user.role ==='undefined' || user.role.length === 0){
                model.error = "choose atleast one role for user";
                return;
            }
            nh_userService.findUserByUsername(user.username)
                .then(userAlreadyExists,
                    function () {

                        nh_userService.createUser(user)
                            .then(function (newUser) {
                                $location.url('/admin/user');
                            });

                    });
        }



        function userEditable(mode,currentUser) {

            if(mode==='edit' && (currentUser.role.indexOf("ADMIN")>-1) ){

                return true;
            }
            else if (mode==='profile'){
                    return true;
            }

            else{
                return false;
            }
        }

        function init() {
            if(model.mode === 'create'){
                model.user = {role:[]};
                model.roles = ['ADMIN','NORMAL','PUBLISHER'];
                model.selectedRole = "";
                model.showCreate = true;
                model.showChangePassword=false;
                model.showNewPassword = false;


            }
            else if(model.mode ==="edit" ||model.mode ==='view' ||model.mode==='profile'){
                model.showCreate = false;
                if(userEditable(model.mode,currentUser)){
                    model.showChangePassword = true;
                    model.showNewPassword = false;
                    model.showUpdate = true;
                }
                else{
                    model.showChangePassword = false;
                    model.showNewPassword = false;
                    model.showUpdate = false;
                }

                model.roles = [];
                model.username = $routeParams['username'];

                if(model.mode ==='profile'){
                    model.username = currentUser.username;
                    model.headerText = "Profile";
                }
                if(model.mode==='view'){
                    model.headerText ='User';
                }

                nh_userService.findUserByUsername(model.username)
                    .then(function (user) {
                        model.user = user;

                        if(model.mode ==='view'){

                            if(currentUser._id !== user._id){
                                model.showFollowButtons = true;
                                model.visitingUserId = currentUser._id;
                                if (model.user.followers.indexOf(currentUser._id)>-1){
                                    model.showUnfollow = true
                                }
                                else{
                                    model.showUnfollow = false;
                                }
                            }



                        }

                        renderFollowersAndFollowing(user);


                    })
            }
        }
        init();

        function renderFollowersAndFollowing(user) {
            nh_userService.findAllFollowingForUser(user._id)
                .then(function (following) {
                    model.following = following;
                });
            nh_userService.findAllFollowersForUser(user._id)
                .then(function (followers) {
                    model.followers = followers;
                })
        }

        function isInArray(value, array) {
            return array.indexOf(value) > -1;
        }


        function addremoveUserFromFollowing(userId,followIngId,mode) {
            nh_userService.addremoveUserFromFollowing(userId,followIngId,mode)
                .then(function () {
                    nh_userService.addremoveUserFromFollowers(followIngId,userId,mode)
                        .then(function () {
                            $route.reload();
                        })
                })
        }
        function addremoveUserFromFollowers(userId,followerId,mode) {
            nh_userService.addremoveUserFromFollowers(userId,followerId,mode)
                .then(function () {
                    nh_userService.addremoveUserFromFollowing(followerId,userId,mode)
                        .then(function () {
                            $route.reload();
                        })
                })
        }

        function allowPasswordChange() {
            model.showNewPassword = true;
            model.showChangePassword = false;
        }
        function deleteUser(userId) {
            nh_userService.deleteUser(userId)
                .then(function () {
                    $location.url("/admin/user");
                })
        }




        function userAlreadyExists(found) {
            if (found!==null) {
                //model.message = "Welcome " + username;
                model.error = "Username already taken .Choose a different username !!";
            }
        }

        function changePassword(userId,password,verifyPassword) {
            if (model.showNewPassword){
                if(typeof password ==='undefined'|| password === '' || password === null){
                    model.error = "New Password Cannot be blank";
                    return;
                }
                if(typeof verifyPassword ==='undefined'|| verifyPassword === '' || verifyPassword === null){
                    model.error = "Verify Password Cannot be blank";
                    return;
                }
                if(password !== verifyPassword){
                    model.error = "Passwords must match";
                    return;
                }
                nh_userService.changePassword(userId,password)
                    .then(function (user) {
                        model.error = "Password Changed Successfully";
                        model.showNewPassword = false;
                        model.showChangePassword = true;
                    },function (err) {
                        model.error = "Error while changing password";
                    })


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

        function addRole(role){

            var index = model.user.role.indexOf(role);
            if(index === -1){
                model.user.role.push(role);
            }

        }
        function removeRole(role) {
            var index = model.user.role.indexOf(role);
            model.user.role.splice(index,1);
        }

    }
})()