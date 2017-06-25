var mongoose = require('mongoose');

var nh_commentSchema = mongoose.Schema({
    _user:{type: mongoose.Schema.Types.ObjectId,ref:'NH_UserModel'},
    _article:{type:mongoose.Schema.Types.ObjectId,ref:'NH_ArticleModel'},
    text:String,
    reported:Boolean,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "NH_Comment"});

module.exports = nh_commentSchema;