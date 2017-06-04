var app = require('../../express');

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
    website.developerId = developerId;
    website._id = (new Date()).getTime() + "";
    websites.push(website);
    res.sendStatus(200);
}


function updateWebsite(req,res) {
    var websiteId = req.params['websiteId'];
    var website = req.body;

    for(var i in websites){
        if(websites[i]._id === websiteId){
            websites[i].name = website.name;
            websites[i].description = website.description;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWebsite(req,res) {
    var websiteId = req.params['websiteId'];

    var website = findWebsiteByIdInternal(websiteId);

    if(website!==null && typeof  website !== 'undefined'){
        var index = websites.indexOf(website);
        websites.splice(index, 1);
        res.sendStatus(200);
        return;
    }
    else{
        res.sendStatus(404);
        return;
    }

}
function findWebsiteById(req,res) {
    var websiteId = req.params['websiteId'];
    var website = findWebsiteByIdInternal(websiteId);
    if(website!==null || typeof website !=='undefined'){
        res.json(website);
        return;
    }
    else{
        res.sendStatus(404);
        return;
    }
}


function findWebsiteByIdInternal(websiteId) {
    return websites.find(function (website) {
        return website._id === websiteId;
    });
}

function findAllWebsitesForUser(req,res) {

    var userId = req.params['userId'];
    var results = [];

    for(var v in websites) {
        if(websites[v].developerId === userId) {
            websites[v].created = new Date();
            websites[v].accessed = new Date();
            results.push(websites[v]);
        }
    }
    res.json(results);
    return;
}