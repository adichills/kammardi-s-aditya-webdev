(function () {
    angular
        .module('NH')
        .factory('nh_userService',nh_userService)
    
    function nh_userService($http) {


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
            updateUser:updateUser,
            findAllUsers:findAllUsers,
            findUsersByIds:findUsersByIds,
            findAllFollowingForUser : findAllFollowingForUser,
            findAllFollowersForUser:findAllFollowersForUser,
            removeUserFromFollowers:removeUserFromFollowers,
            removeUserFromFollowing:removeUserFromFollowing,
            changePassword:changePassword

        };
        return api;

        function removeUserFromFollowers(userId,followerId){
            var url = "/api/nh/user/followers/"+ userId +"/"+followerId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }
        function removeUserFromFollowing(userId,followingId){
            var url = "/api/nh/user/following/"+ userId +"/"+followingId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function register(userObj) {
            var url = "/api/nh/register";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllFollowersForUser(userId) {
            var url = "/api/nh/user/followers/"+ userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findAllFollowingForUser(userId) {
            var url = "/api/nh/user/following/"+ userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function unregister() {
            var url = "/api/nh/unregister";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function loggedin() {
            var url = "/api/nh/loggedin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/nh/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }



        function login(username, password) {
            var url = "/api/nh/login";
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
            var url = '/api/nh/user/'+userId;
            return $http.delete(url)
                .then(sendResponseData);

        }

        function updateUser(userId,user){
            var url = '/api/nh/user/'+userId;
            return $http.put(url,user)
                .then(sendResponseData);
        }

        function createUser(user) {
            var url = "/api/nh/user";
            return $http.post(url,user)
                .then(sendResponseData);
        }

        function findUserByUsername(username) {
            var url = "/api/nh/user?username="+username;
            return $http.get(url)
                .then(sendResponseData);

        }
        function findUsersByIds(userIds) {
            var url = "/api/nh/user";
            return $http.get(url,userIds)
                .then(sendResponseData);
        }
        function findAllUsers() {
            var url = "/api/nh/user";
            return $http.get(url)
                .then(sendResponseData);
        }
        function sendResponseData(response) {
            return response.data;
        }

        function findUserByUserId(userId) {
            var url = "/api/nh/user/"+userId;
            return $http.get(url)
                .then(sendResponseData);

        }

        function findUserByCredentials(username,password) {
            var url = "/api/nh/user?username="+username+"&password="+password;
            return $http.get(url)
                .then(sendResponseData);
        }

        function changePassword(userId,password) {
            var url ='/api/nh/changePassword/'+userId;
            return $http.put(url,{password:password})
                .then(sendResponseData);
        }
    }
})()