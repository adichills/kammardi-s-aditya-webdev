var app = require('../../express');
var nh_userModel = require('../model/user/user.model.server');



app.get('/api/nh/user',findAllUsers);
app.get('/api/nh/user/:userId',findUserById);
app.post('/api/nh/user',createUser);
app.put('/api/nh/user/:userId',updateUser);
app.delete('/api/nh/user/:userId',deleteUser);


function createUser(req,res) {
    var user = req.body;
    nh_userModel.createUser(user)
        .then(function (user) {
            console.log(user);
            res.json(user);
        }, function (err) {
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
