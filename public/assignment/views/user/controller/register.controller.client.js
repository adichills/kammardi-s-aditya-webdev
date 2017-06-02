/**
 * Created by Aditya on 5/25/2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location,userService) {

        var model = this;
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ]


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
                    userService.createUser(newUser)
                        .then(function (newUser) {
                            $location.url('/user/' + newUser._id);
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