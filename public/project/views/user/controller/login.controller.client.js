/**
 * Created by Aditya on 5/25/2017.
 */
(function () {
    angular
        .module('NH')
        .controller('nh_loginController', nh_loginController);

    function nh_loginController($location,nh_userService) {

        var model = this;



            model.login = login;


        function login(username, password) {

            if(username === null || username === '' || typeof username === 'undefined'){
                model.message = "username field cannot be empty";
                return;
            }

            if(password === null || typeof password === 'undefined'){
                model.message = "password field cannot be empty";
                return;
            }

            nh_userService.login(username,password)
                .then(userFound,userNameOrPasswordDoesNotMatch)


        }

        function userFound(found){
            $location.url('/profile');
        }
        function userNameOrPasswordDoesNotMatch(found) {
            model.message = "Sorry username or password does not match !!! Try again";
        }
    }
})()