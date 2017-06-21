/**
 * Created by Aditya on 6/19/2017.
 */


var mongoose = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/webdev_summer1_2017';
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds137101.mlab.com:37101/heroku_8mg642zw'; // user yours
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);

mongoose.Promise = require('q').Promise;


require('./services/nh.user.service.server');
require('./services/dashboard.service.server');

