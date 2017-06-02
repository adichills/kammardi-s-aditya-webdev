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
            updateUser:updateUser

        };
        return api;

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