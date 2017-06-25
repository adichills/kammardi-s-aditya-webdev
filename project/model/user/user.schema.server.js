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
    dateCreated: {type: Date, default: Date.now},
    facebook: {
        id:    String,
        token: String
    },
    followers:[{type:mongoose.Schema.Types.ObjectId,ref:"NH_UserModel"}],
    following:[{type:mongoose.Schema.Types.ObjectId,ref:"NH_UserModel"}],
    savedArticles:[{type:mongoose.Schema.Types.ObjectId,ref:"NH_ArticleModel"}],
    authoredArticles:[{type:mongoose.Schema.Types.ObjectId,ref:"NH_ArticleModel"}],
    role:{type:String ,enum:['ADMIN', 'NORMAL', 'PUBLISHER'],default:'NORMAL'},
    comments:[{type:mongoose.Schema.Types.ObjectId,ref:"NH_CommentModel"}],
    loggedinAs:String



}, {collection: "NH_User"});

module.exports = nh_userSchema;