var app = require('../../express');

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
    for(var v in pages) {
        if(pages[v].websiteId === websiteId) {
            pages[v].created = new Date();
            pages[v].accessed = new Date();
            results.push(pages[v]);
        }
    }
    res.json(results);
    return;
}

function updatePage(req,res) {

    var pageId = req.params['pageId'];
    var page = req.body;

    for(var i in pages){
        if(pages[i]._id === pageId){
            pages[i].name = page.name;
            pages[i].description = page.description;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
    return;

}

function deletePage(req,res) {
    var pageId = req.params['pageId'];

    var page = findPageByIdInternal(pageId);
    if(page!==null && typeof  page !== 'undefined'){
        var index = pages.indexOf(page);
        pages.splice(index, 1);
        res.sendStatus(200);
        return;
    }
    else{
        res.sendStatus(404);
        return;
    }

}

function findPageByIdInternal(pageId) {
    return pages.find(function (page) {
        return page._id === pageId;
    });
}

function findpageById(req,res) {

    var pageId = req.params['pageId'];
    var page = findPageByIdInternal(pageId);
    if(page!==null && typeof page !=='undefined'){
        res.json(page);
        return;
    }
    else{
        res.sendStatus(404);
        return;
    }

}

function createPage(req,res) {
    var page = req.body;
    var websiteId = req.params['websiteId'];
    page.websiteId = websiteId;
    page._id = (new Date()).getTime() + "";
    pages.push(page);

    res.sendStatus(200);
}