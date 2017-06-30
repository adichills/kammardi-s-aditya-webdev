(function () {
    angular
        .module("NH")
        .controller("nh_adminController",nh_adminController)
        .controller("nh_adminUserSearchController",nh_adminUserSearchController);

    function nh_adminController($location,currentUser,$routeParams,nh_adminService) {

        var model = this;
        model.stats = {}
        function init() {
            nh_adminService.getAdminStats()
                .then(function (stats) {
                    model.stats = stats;
                })
        }
        init();
    }

    function nh_adminUserSearchController($location,currentUser,$routeParams,nh_userService) {
        var model = this;

        model.searchUser = searchUser;

        model.userDetail = userDetail;

        function initialzieParameters() {
            model.userId = currentUser._id;
            model.user = currentUser;
            model.showCreate = true;
        }
        initialzieParameters();

        function userDetail(username) {
            $location.url("/manage/user/edit/" + username);
        }


        function searchUser(username) {
            if (username === null || username ==='' || typeof username ==='undefined'){
                nh_userService.findAllUsers()
                    .then(function (users) {
                        model.users = users;

                    })
            }
            else{
                nh_userService.findUserByUsername(username)
                    .then(function (user) {
                        model.users = []
                        model.users.push(user);

                    })
            }
        }

        function isInArray(value, array) {
            return array.indexOf(value) > -1;
        }











        function renderUser (user) {
            model.user = user;
        }

        function userError(error) {
            model.error = "User not found";
        }


    }
})()