var app = require('../../express');
var pageModel = require('../model/page/page.model.server');

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }

];

app.get('/api/assignment/website/:websiteId/page',findAllPagesForWebsite);
app.delete('/api/assignment/page/:pageId',deletePage);
app.put('/api/assignment/page/:pageId',updatePage);
app.get('/api/assignment/page/:pageId',findpageById);

app.post('/api/assignment/website/:websiteId/page',createPage);


function findAllPagesForWebsite(req,res) {
    var results = [];
    var websiteId = req.params['websiteId'];
    pageModel.findAllPagesForWebsite(websiteId)
        .then(function (pages) {
            res.json(pages);
        });
}

function updatePage(req,res) {

    var pageId = req.params['pageId'];
    var page = req.body;

    pageModel.updatePage(pageId,page)
        .then(function (status) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });


}

function deletePage(req,res) {
    var pageId = req.params['pageId'];
    pageModel.deletePage(pageId)
        .then(function (status) {
            res.sendStatus(200);
        },function (erre) {
            res.sendStatus(404);
        })

}



function findpageById(req,res) {

    var pageId = req.params['pageId'];

    pageModel.findPageById(pageId)
        .then(function (page) {
            if(page){
                res.json(page);
            }
            else{
                res.sendStatus(404);
            }
        });

}

function createPage(req,res) {
    var page = req.body;
    var websiteId = req.params['websiteId'];

    pageModel.createPage(websiteId,page)
        .then(function (page) {
            res.sendStatus(200);
        });
}