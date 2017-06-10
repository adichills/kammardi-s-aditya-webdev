var app = require('../../express');
var websiteModel = require('../model/website/website.model.server');

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.get('/api/assignment/user/:userId/website',findAllWebsitesForUser);
app.delete('/api/assignment/website/:websiteId',deleteWebsite);
app.put('/api/assignment/website/:websiteId',updateWebsite);
app.get('/api/assignment/website/:websiteId',findWebsiteById);
app.post('/api/assingment/:userId/website',createWebsite);

function createWebsite(req,res) {
    var website = req.body;
    var developerId = req.params['userId'];
    
    websiteModel.createWebsiteForUser(developerId,website)
        .then(function (website) {
            res.json(website);
        });
}


function updateWebsite(req,res) {
    var websiteId = req.params['websiteId'];
    var website = req.body;
    
    websiteModel.updateWebsite(websiteId,website)
        .then(function (status) {
            res.send(status);
        },function (err) {
            res.send(404);
        })

}

function deleteWebsite(req,res) {
    var websiteId = req.params['websiteId'];

    websiteModel.deleteWebsite(websiteId)
        .then(function (status) {
            res.sendStatus(200);
        },then(function (err) {
            res.sendStatus(404);
        }));



}
function findWebsiteById(req,res) {
    var websiteId = req.params['websiteId'];
    websiteModel.findWebsiteById(websiteId)
        .then(function (website) {
            if(website){
                res.json(website);
            }
            else{
                res.sendStatus(404);
            }
        });
}



function findAllWebsitesForUser(req,res) {

    var userId = req.params['userId'];
    websiteModel.findAllWebsitesForUser(userId)
        .then(function (websites) {
            res.json(websites);
        });
}