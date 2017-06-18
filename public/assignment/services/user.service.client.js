(function () {
    angular
        .module('WAM')
        .factory('userService',userService)
    
    function userService($http) {


        var api = {
            findUserByUserId:findUserByUserId,
            findUserByCredentials:findUserByCredentials,
            findUserByUsername:findUserByUsername,
            createUser:createUser,
            deleteUser:deleteUser,
            login:login,
            logout: logout,
            unregister:unregister,
            loggedin: loggedin,
            register: register,
            updateUser:updateUser

        };
        return api;

        function register(userObj) {
            var url = "/api/assignment/register";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function unregister() {
            var url = "/api/assignment/unregister";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function loggedin() {
            var url = "/api/assignment/loggedin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/assignment/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }



        function login(username, password) {
            var url = "/api/assignment/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = '/api/assignment/user/'+userId;
            return $http.delete(url)
                .then(sendResponseData);

        }

        function updateUser(userId,user){
            var url = '/api/assignment/user/'+userId;
            return $http.put(url,user)
                .then(sendResponseData);
        }

        function createUser(user) {
            var url = "/api/assignment/user";
            return $http.post(url,user)
                .then(sendResponseData);
        }

        function findUserByUsername(username) {
            var url = "/api/assignment/user?username="+username;
            return $http.get(url)
                .then(sendResponseData);

        }
        function sendResponseData(response) {
            return response.data;
        }

        function findUserByUserId(userId) {
            var url = "/api/assignment/user/"+userId;
            return $http.get(url)
                .then(sendResponseData);

        }

        function findUserByCredentials(username,password) {
            var url = "/api/assignment/user?username="+username+"&password="+password;
            return $http.get(url)
                .then(sendResponseData);
        }
    }
})()