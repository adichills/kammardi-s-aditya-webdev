/**
 * Created by Aditya on 6/9/2017.
 */
var mongoose = require('mongoose');

var nh_userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone:String,
    // dashboard: {type: mongoose.Schema.Types.ObjectId, ref: "NH_DashboardModel"},
    dateCreated: {type: Date, default: Date.now}
}, {collection: "NH_User"});

module.exports = nh_userSchema;