var mongoose = require('mongoose');

var nh_articleSchema = mongoose.Schema({
    _user:{type: mongoose.Schema.Types.ObjectId,ref:'NH_UserModel'},
    url:String,
    title:String,
    description:String,
    publishedAt:Date,
    urlToImage:String,
    author:String,
    articleType:{type:String,enum:['NEWS','PUBLISHER']},
    reported:{type:Boolean,default:false},
    dateCreated: {type: Date, default: Date.now}
}, {collection: "NH_Article"});

module.exports = nh_articleSchema;