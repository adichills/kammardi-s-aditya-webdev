(function () {
    angular
        .module('WAM')
        .factory('userService',userService)
    
    function userService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

        var api = {
            findUserByUserId:findUserByUserId,
            findUserByCredentials:findUserByCredentials,
            findUserByUsername:findUserByUsername,
            createUser:createUser,
            updateUser:updateUser

        };
        return api;

        function updateUser(userId,user){
            for (var u in users){
                if(users[u]._id===userId){
                    users[u].username = user.username;
                    users[u].password = user.password;
                    users[u].firstName = user.firstName;
                    users[u].lastName = user.lastName;
                }
            }

        }

        function createUser(user) {
            user._id = (new Date()).getTime() + "";
            user.created = new Date();
            users.push(user);
            return user;
        }

        function findUserByUsername(username) {
            var user = users.find(function (user) {
                return user.username === username;
            });
            if(typeof user === 'undefined') {
                return null;
            }
            return user;
        }

        function findUserByUserId(userId) {
            for(var u in users){
                if(users[u]._id==userId){
                    return users[u];
                }

            }
            return null;
        }

        function findUserByCredentials(username,password) {
            var found = null;
            for (u in users) {
                var user = users[u];
                if (user.username === username
                    && user.password === password) {
                    found = user;
                    return found;
                }
            }
            return found;

        }
    }
})()