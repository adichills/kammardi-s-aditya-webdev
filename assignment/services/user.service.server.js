var app = require('../../express');
var userModel = require('../model/user/user.model.server');


var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var bcrypt = require("bcrypt-nodejs");


var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'photos', 'email','first_name','last_name']

};



passport.use(new LocalStrategy(localStrategy));
passport.use(new FacebookStrategy(facebookConfig,facebookStrategy));

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);








app.get('/api/assignment/user',findAllUsers);
app.get('/api/assignment/user/:userId',findUserById);
app.post('/api/assignment/user',createUser);
app.put('/api/assignment/user/:userId',updateUser);
app.delete('/api/assignment/user/:userId',deleteUser);

app.post  ('/api/assignment/login', passport.authenticate('local'), login);
app.get   ('/api/assignment/loggedin', loggedin);
app.post  ('/api/assignment/logout', logout);
app.post  ('/api/assignment/register', register);
app.post('/api/assignment/unregister',unregister);

app.get ('/auth/assignment/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/assignment/callback',
    passport.authenticate('facebook', {
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: '/assignment/index.html#!/login'
    }));

// function facebookStrategy(token, refreshToken, profile, done) {
//     userModel
//         .findUserByFacebookId(profile.id)
//         .then(
//             function(user) {
//                 if(user) {
//                     return done(null, user);
//                 } else {
//                     var email = profile.emails[0];
//                     //var emailParts = email.split("@");
//                     var newFacebookUser = {
//                         username:  email.value,
//                         firstName: profile.name.givenName,
//                         lastName:  profile.name.familyName,
//                         email:     email.value,
//                         facebook: {
//                             id:    profile.id,
//                             token: token
//                         }
//                     };
//                     return userModel.createUser(newFacebookUser);
//                 }
//             },
//             function(err) {
//                 if (err) { return done(err); }
//             }
//         )
//         .then(
//             function(user){
//                 return done(null, user);
//             },
//             function(err){
//                 if (err) { return done(err); }
//             }
//         );
// }

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(function (user) {
            if (user) {
                done(null, user);
            } else {

                var email = profile.emails[0];
                //var emailParts = email.split("@");
                var newFacebookUser = {
                    username: email.value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: email.value,
                    facebook: {
                        id: profile.id,
                        token: token
                    }
                };
                userModel
                    .createUser(newFacebookUser)
                    .then(function (user) {
                        if (user) {
                            done(null, user);
                        } else {
                            done(null, false);
                        }
                    });
            }
        }, function (error) {
            done(error, false);
        });
}

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if (user && bcrypt.compareSync(password, user.password)) {
                done(null, user);
            } else {
                done(null, false);
            }
        }, function (error) {
            done(error, false);
        });
}


function deleteUser(req,res){
    var userId = req.params['userId'];
    userModel.deleteUser(userId)
        .then(function (status) {
            res.send(status);
        });
}

function unregister(req,res) {
    var userId = req.user._id;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.logout()
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

function register(req, res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);
    userModel
        .createUser(userObj)
        .then(function (user) {
            req
                .login(user, function (status) {
                    res.send(status);
                });
        });
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function loggedin(req, res) {
    console.log(req.user);
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}


function login(req, res) {
    res.json(req.user);
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

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}