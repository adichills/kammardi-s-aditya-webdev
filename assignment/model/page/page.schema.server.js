/**
 * Created by Aditya on 6/9/2017.
 */
var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({

    _website:{type: mongoose.Schema.Types.ObjectId,ref:'WebsiteModel'},
    name: String,
    title:String,
    description: String,
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "WidgetModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "Page"});

module.exports = pageSchema;