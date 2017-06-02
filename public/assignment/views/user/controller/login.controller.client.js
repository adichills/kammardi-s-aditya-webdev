/**
 * Created by Aditya on 5/25/2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController($location,userService) {

        var model = this;
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ]


            model.login = login;


        function login(username, password) {
            userService.findUserByCredentials(username,password)
                .then(userFound,userNameOrPasswordDoesNotMatch)


        }

        function userFound(found){
            $location.url('/user/' + found._id);
        }
        function userNameOrPasswordDoesNotMatch(found) {
            model.message = "Sorry username or password does not match !!! Try again";
        }
    }
})()