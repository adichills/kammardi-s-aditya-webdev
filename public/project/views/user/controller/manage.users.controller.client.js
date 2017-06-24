(function () {
    angular
        .module("NH")
        .controller("nh_manageUserController",nh_manageUserController);

    function nh_manageUserController(currentUser,$location,$routeParams,nh_userService) {

        var model = this;
        model.mode = $routeParams["mode"];

        function init() {
            if(model.mode === 'create'){
                model.user = {role:[]};
                model.roles = ['ADMIN','NORMAL','PUBLISHER'];
                model.selectedRole = "";
                model.showCreate = true;
                model.showChangePassword=false;
                model.showNewPassword = false;

            }
            else if(model.mode ==="edit"){
                model.showCreate = false;
                model.showChangePassword = true;
                model.showNewPassword = false;
                model.showUpdate = true;
                model.roles = [];
                model.username = $routeParams['username'];
                nh_userService.findUserByUsername(model.username)
                    .then(function (user) {
                        model.user = user;
                        if (typeof model.user ==='undefined' || model.user.role === null || model.user.role.length ===0){
                            model.roles = ['ADMIN','NORMAL','PUBLISHER'];
                        }
                        else{
                            if(!isInArray('NORMAL',model.user.role)){
                                model.roles.push('NORMAL');
                            }
                            if(!isInArray('PUBLISHER',model.user.role)){
                                model.roles.push('PUBLISHER');
                            }
                            if(!isInArray('ADMIN',model.user.role)){
                                model.roles.push('ADMIN');
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

        model.createNewUser = createNewUser;
        model.addRole = addRole;
        model.removeRole = removeRole;
        model.updateUser = updateUser;
        model.allowPasswordChange = allowPasswordChange;
        model.changePassword = changePassword;
        model.deleteUser = deleteUser;

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