var app = require('../../express');
var userModel = require('../model/user/user.model.server');

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];

app.get('/api/assignment/user',findAllUsers);
app.get('/api/assignment/user/:userId',findUserById);
app.post('/api/assignment/user',createUser);
app.put('/api/assignment/user/:userId',updateUser);
app.delete('/api/assignment/user/:userId',deleteUser);

function deleteUser(req,res){
    var userId = req.params['userId'];
    userModel.deleteUser(userId)
        .then(function (status) {
            res.send(status);
        });
}



function createUser(req,res) {
    var user = req.body;
    userModel.createUser(user)
        .then(function (user) {
            console.log(user);
            res.json(user);
        },function (err) {
            res.send(err);
        });


}
function updateUser(req,res) {
    
    var userId = req.params['userId'];
    var user = req.body;
    
    userModel.updateUser(userId,user)
        .then(function (status) {
            res.send(status);
        });
}

function findAllUsers(req,res) {

     var username = req.query['username'];
     var password = req.query['password'];

     if(username && password) {
         userModel.findUserByCredentials(username,password)
             .then(function (user) {
                 if(user){
                     res.json(user);
                 }
                 else{
                     res.sendStatus(404);
                 }
             });
     }
     else if(username){
         userModel.findUserByUsername(username)
             .then(function (user) {
                 if(user){
                     res.json(user);
                 }
                 else{
                     res.sendStatus(404);
                 }
             });
     }
     else{
         userModel
             .findAllUsers()
             .then(function (users) {
                 res.json(users);
             });
     }
}

function  findUserById(req,res) {
    var userId = req.params['userId'];
    userModel.findUserById(userId)
        .then(function (user) {
            res.json(user);
        },function (err) {
            res.sendStatus(404);
        });
}

// function findUserByCredentials(req,res) {
//     var username = req.params['username'];
//     var password = req.params['password'];
//     var found = null;
//     for (u in users) {
//         var user = users[u];
//         if (user.username === username
//             && user.password === password) {
//             found = user;
//             res.json(found);
//
//             return;
//         }
//     }
//     res.sendStatus(404);
//     return;
//
// }
//
// function findUserByUsername(username) {
//     var user = users.find(function (user) {
//         return user.username === username;
//     });
//     if(typeof user === 'undefined') {
//         return null;
//     }
//     return user;
// }
