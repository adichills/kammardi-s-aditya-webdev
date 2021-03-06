var app = require('../../express');
var nh_userModel = require('../model/user/user.model.server');


var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var bcrypt = require("bcrypt-nodejs");


var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'photos', 'email','first_name','last_name']

};

var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};






passport.use(new LocalStrategy({passReqToCallback:true},localStrategy));
passport.use(new FacebookStrategy(facebookConfig,facebookStrategy));
passport.use(new GoogleStrategy(googleConfig, googleStrategy));


passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);








app.get('/api/nh/user',findAllUsers);
app.get('/api/nh/user/followers/:userId',findAllFollowersForUser);
app.get('/api/nh/user/following/:userId',findAllFollowingForUser);

app.delete('/api/nh/user/followers/:userId/:followerId/:mode',addremoveUserFromFollowers);
app.delete('/api/nh/user/following/:userId/:followingId/:mode',addremoveUserFromFollowing);


app.get('/api/nh/user/:userId',findUserById);
app.post('/api/nh/user',createUser);
app.put('/api/nh/user/:userId',updateUser);
app.delete('/api/nh/user/:userId',deleteUser);

app.post  ('/api/nh/login', passport.authenticate('local'), login);
app.get   ('/api/nh/loggedin', loggedin);
app.post  ('/api/nh/logout', logout);
app.post  ('/api/nh/register', register);
app.post('/api/nh/unregister',unregister);

app.put('/api/nh/changePassword/:userId',changePassword);

app.get ('/auth/nh/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/nh/callback',
    passport.authenticate('facebook', {
        successRedirect: '/project/index.html#!/profile/profile',
        failureRedirect: '/project/index.html#!/login'
    }));

app.get('/auth/nh/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/auth/google/nh/callback',
    passport.authenticate('google', {
        successRedirect: '/project/index.html#!/profile/profile',
        failureRedirect: '/project/index.html#!/login'
    }));

function googleStrategy(token, refreshToken, profile, done) {
    nh_userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return nh_userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function changePassword(req,res) {
    var userId = req.params['userId'];
    var passwordObj = req.body;

    var encryptedPassword = bcrypt.hashSync(passwordObj.password);
    nh_userModel.changePassword(userId,encryptedPassword)
        .then(function (user) {
            res.json(user);
        },function (err) {
            res.send(err);
        })
}

function addremoveUserFromFollowers(req,res) {
    var userId = req.params['userId'];
    var followerId = req.params['followerId'];
    var mode = req.params['mode'];

    nh_userModel.addremoveUserFromFollowers(userId,followerId,mode)
        .then(function (user) {
            res.json(user)
        },function (error) {
            res.send(error);
        })
}

function addremoveUserFromFollowing(req,res) {
    var userId = req.params['userId'];
    var followingId = req.params['followingId'];
    var mode = req.params['mode'];

    nh_userModel.addremoveUserFromFollowing(userId,followingId,mode)
        .then(function (user) {
           res.json(user);
        },function (error) {
            res.send(error);
        });
}

function findAllFollowersForUser(req,res) {
    var userId = req.params['userId'];
    nh_userModel.findFollowersForUser(userId)
        .then(function (users) {
            res.json(users);
        })
}

function findAllFollowingForUser(req,res) {
    var userId = req.params['userId'];
    nh_userModel.findFollowingForUser(userId)
        .then(function (users) {
            res.json(users);
        })
}

function facebookStrategy(token, refreshToken, profile, done) {
    nh_userModel
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
                nh_userModel
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

function localStrategy(req,username, password, done) {
    nh_userModel
        .findUserByUsername(username)
        .then(function (user) {
            if (user && bcrypt.compareSync(password, user.password)) {
                var credentials = req.body;
                user.loggedinAs = credentials.role;
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
    nh_userModel.deleteUser(userId)
        .then(function (status) {
            res.send(status);
        });
}

function  unregister(req,res) {
    var userId = req.user._id;
    nh_userModel
        .deleteUser(userId)
        .then(function (status) {
            res.logout()
            res.send(status);
        });
}



function createUser(req,res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    nh_userModel.createUser(user)
        .then(function (user) {

            res.json(user);
        },function (err) {
            res.send(err);
        });


}

function register(req, res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);
    nh_userModel
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

    nh_userModel.updateUser(userId,user)
        .then(function (status) {
            res.send(status);
        });
}

function findAllUsers(req,res) {

    var username = req.query['username'];
    var password = req.query['password'];
    //var userIds = req.body;
    if(username && password) {
        nh_userModel.findUserByCredentials(username,password)
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
        nh_userModel.findUserByUsername(username)
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
        nh_userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }
}

function  findUserById(req,res) {
    var userId = req.params['userId'];
    nh_userModel.findUserById(userId)
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
    nh_userModel
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