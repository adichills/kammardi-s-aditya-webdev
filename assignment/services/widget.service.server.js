/**
 * Created by Aditya on 6/2/2017.
 */
var app = require('../../express');
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });
var widgetModel = require('../model/widget/widget.model.server');


var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
]

app.get('/api/assignment/page/:pageId/widget',findAllWidgetsForPage);
app.post('/api/assignment/page/:pageId/widget',createWidget);
app.delete('/api/assignment/widget/:widgetId',deleteWidget);
app.put('/api/assignment/widget/:widgetId',updateWidget);
app.get('/api/assignment/widget/:widgetId',findWidgetById);
app.post ("/api/assignment/upload", upload.single('myFile'), uploadImage);
app.put("/api/assignment/page/:pageId/widget",reOrderWidgets);
app.put('/api/assignment/flickr/:pageId/:widgetId',updateWidgetForFlickr);

function updateWidgetForFlickr(req,res) {
    var pageId = req.params['pageId'];
    var widgetId = req.params['widgetId'];
    var urlObject = req.body;
    var url = urlObject.url;

    widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            widget.url = url;
            widgetModel.updateWidget(widgetId,widget)
                .then(function (status) {
                    res.sendStatus(200);
                })
        });
}

function reOrderWidgets(req,res) {
    var pageId = req.params['pageId'];
    var sIndex = parseInt(req.query.initial);
    var eIndex = parseInt(req.query.final);

    widgetModel.reorderWidget(pageId,sIndex,eIndex)
        .then(function (status) {
            res.sendStatus(200);
        });

    // var results = [];
    // console.log(pageId);
    // for(var v in widgets) {
    //     if(widgets[v].pageId === pageId) {
    //
    //         results.push(widgets[v]);
    //
    //     }
    // }
    //
    // for (var v in results){
    //     var index = widgets.indexOf(results[v]);
    //     widgets.splice(index,1);
    // }
    // results.splice(eIndex,0,results.splice(sIndex,1)[0]);
    //
    //
    // console.log("Start Index - " + sIndex);
    // console.log('End Index - ' + eIndex);
    // console.log(results.length);
    // console.log(results)
    // for (var v in results){
    //
    //         widgets.push(results[v]);
    //
    //
    // }
    // //console.log(widgets.length);
    // //console.log(widgets);
    // res.sendStatus(200);

}

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            widget.url = '/assignment/uploads/'+filename;
            widget.width = width;

            widgetModel.updateWidget(widgetId,widget)
                .then(function (status) {
                    var callbackUrl   = "/assignment/#!/website/"+websiteId+'/page/'+pageId +'/widget/'+widgetId;
                    res.redirect(callbackUrl);
                });
        });


}




function createWidget(req,res) {
    var pageId = req.params['pageId'];
    var widget = req.body;

    widgetModel.createWidget(pageId,widget)
        .then(function (widget) {
            res.json(widget);
        });
}

function deleteWidget(req,res) {
    var widgetId = req.params['widgetId'];
    widgetModel.deleteWidget(widgetId)
        .then(function (status) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });


}

function findWidgetById(req,res) {
    var widgetId = req.params['widgetId'];
    widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            if(widget){
                res.json(widget);
            }
            else{
                res.sendStatus(404);
            }
        });

}


function updateWidget(req,res) {

    var widgetId = req.params['widgetId'];
    var widget = req.body;

    widgetModel.updateWidget(widgetId,widget)
        .then(function (status) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });
}

function findAllWidgetsForPage(req,res) {

    var pageId = req.params['pageId'];
    widgetModel.findAllWidgetsForPage(pageId)
        .then(function (widgetIds) {
            widgetModel.getWidgetsByIds(widgetIds)
                .then(function (widgets) {
                    //console.log(widgetIds);
                    var hashTableResults = getHashtableOfWidgets(widgets);
                    var widgetsOfPage = [];
                    for (var i=0 ;i<widgetIds.length;i++){
                        var widgetId = widgetIds[i];
                        var widget = hashTableResults[widgetId];
                        //console.log(widget);
                        widgetsOfPage.push(widget);
                    }
                    res.json(widgetsOfPage);
                })
        });
}

function getHashtableOfWidgets(widgets) {
    var hashTable = {};
    for (var v in widgets){
        hashTable[widgets[v]._id] = widgets[v];

    }
    return hashTable;
}

