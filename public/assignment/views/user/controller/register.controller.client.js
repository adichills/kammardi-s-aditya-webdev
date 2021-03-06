/**
 * Created by Aditya on 5/25/2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location,userService) {

        var model = this;



            model.register = register;


        function register(username, password,password2) {

            if(username === null || username === '' || typeof username === 'undefined'){
                model.error = "username field cannot be empty";
                return;
            }

            if(password === null || typeof password === 'undefined'){
                model.error = "password field cannot be empty";
                return;
            }

            if(password2 === null || typeof password2 === 'undefined'){
                model.error = "Verify password field cannot be empty";
                return;
            }

            if(password!==password2){
                register.error = "passwords must match !!!";
                return;
            }

            userService.findUserByUsername(username)
                .then(userAlreadyExists,
                function () {
                    var newUser = {
                        username : username,
                        password : password
                    };
                    userService.register(newUser)
                        .then(function (newUser) {
                            $location.url('/profile');
                        });

                });

        }

        function userAlreadyExists(found) {
            if (found!==null) {
                //model.message = "Welcome " + username;
                model.error = "Username already taken .Choose a different username !!";
            }
        }
        function userDoesNotExist(found,username,password){
            var newUser = {
                username : username,
                password : password
            };
             userService.createUser(newUser)
                .then(function (newUser) {
                    $location.url('/user/' + newUser._id);
                });

        }
    }
})()