(function () {
    angular
        .module("NH")
        .controller("nh_headerController",nh_headerController);

    function nh_headerController($routeParams,nh_userService,$location) {

        var model = this;
        model.logout = logout;

        nh_userService
            .loggedin()
            .then(function (user) {
                if(user==="0"){
                    model.showLogin=true;
                    model.showAdmin = false;
                    model.showDashboard = false;
                    model.showRegister = true;
                    model.showProfile = false;
                    model.showLogout=false;
                    model.showPublishedArticle = false;
                }
                else{
                    model.showLogin=false;
                    model.showDashboard = true;
                    model.showRegister = false;
                    model.showProfile = true;
                    model.showLogout = true;
                    if (user.role==='PUBLISHER'){
                        model.showPublishedArticle = true;
                    }
                    else{
                        model.showPublishedArticle = false;
                    }
                    if (user.role ==='ADMIN'){
                        model.showAdmin = true;
                    }
                    else{
                        model.showAdmin = false;
                    }
                }
            })

        function logout() {
            nh_userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }


    }
})()