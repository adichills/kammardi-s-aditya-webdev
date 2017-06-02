var app = require('../../express');

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

    for(var u in users){
        if (users[u]._id === userId){
            users.splice(u,1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);

}



function createUser(req,res) {
    var user = req.body;
    user._id = (new Date()).getTime() + "";
    user.created = new Date();
    users.push(user);
    res.json(user);
    return;

}
function updateUser(req,res) {
    var userId = req.params['userId'];
    var user = req.body;
    for (var u in users){
        if(users[u]._id===userId){
            users[u].username = user.username;
            users[u].password = user.password;
            users[u].firstName = user.firstName;
            users[u].lastName = user.lastName;
            users[u].email = user.email;
            res.sendStatus(200);
            return;
        }

    }
    res.sendStatus(404);
}

function findAllUsers(req,res) {

     var username = req.query['username'];
     var password = req.query['password'];

     if(username && password) {
         var found = null;
         for (u in users) {
             var user = users[u];
             if (user.username === username
                 && user.password === password) {
                 found = user;
                 res.json(found);
                 return;
             }
         }
         res.sendStatus(404);
         return;

     }
     else if(username){
         var user = findUserByUsername(username);
         if (user!==null){
             res.json(user);
             return;
         }
         else{
             res.sendStatus(404);
             return;
         }
     }
     else{
         res.send(users);
     }
}

function  findUserById(req,res) {
    var userId = req.params['userId'];
    for(var u in users){
        if(users[u]._id==userId){
            res.send(users[u]);
            return;
        }

    }
    res.sendStatus(404);
    return;
}

function findUserByCredentials(req,res) {
    var username = req.params['username'];
    var password = req.params['password'];
    var found = null;
    for (u in users) {
        var user = users[u];
        if (user.username === username
            && user.password === password) {
            found = user;
            res.json(found);

            return;
        }
    }
    res.sendStatus(404);
    return;

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
