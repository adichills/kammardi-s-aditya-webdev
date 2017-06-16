/**
 * Created by Aditya on 6/14/2017.
 */

var mongoose = require('mongoose');

var nh_dashboardSchema = mongoose.Schema({
    _user:{type: mongoose.Schema.Types.ObjectId,ref:'NH_UserModel'},
    news_media: [{type:String}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "NH_User"});

module.exports = nh_dashboardSchema;