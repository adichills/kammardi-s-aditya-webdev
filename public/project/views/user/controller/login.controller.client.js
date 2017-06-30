/**
 * Created by Aditya on 5/25/2017.
 */
(function () {
    angular
        .module('NH')
        .controller('nh_loginController', nh_loginController);

    function nh_loginController($location,nh_userService,$timeout,$route,$window) {

        var model = this;
        model.login = login;



        function login(username, password) {

            // if (model.selectedRole===""){
            //     model.message ="Please select a role";
            //     return;
            // }

            if(username === null || username === '' || typeof username === 'undefined'){
                model.message = "username field cannot be empty";
                return;
            }

            if(password === null || typeof password === 'undefined'){
                model.message = "password field cannot be empty";
                return;
            }

            nh_userService.login(username,password,model.selectedRole)
                .then(userFound,userNameOrPasswordDoesNotMatch)


        }

        function userFound(found){




                if(found.role ==="ADMIN"){
                    $location.url('/admin');
                }
                else if (found.role ==="NORMAL"){
                    $location.url('/dashboard');
                }
                else{
                    $location.url('/publisher/article')
                }

            setTimeout(function(){
                window.location.reload();
            });
            //$window.location.reload();



        }
        function userNameOrPasswordDoesNotMatch(found) {
            model.message = "Sorry username or password does not match !!! Try again";
        }
    }
})()