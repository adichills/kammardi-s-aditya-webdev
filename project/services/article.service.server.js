var app = require('../../express');

var nh_articleModel = require('../model/article/article.model.server');
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/project/uploads' });

//api
app.post("/api/nh/article",saveArticle);
app.get("/api/nh/article/:userId/:type",fetchArticlesByUserId);
app.get("/api/nh/savedArticle/:articleId",fetchArticleById);

app.put("/api/nh/publishedArticle/:articleId",updatePublishedArticle);
app.get("/api/nh/admin/fetchReportedArticles",fetchReportedArticles);

app.delete("/api/nh/article/:articleId/:userId/:articleType",deleteArticle);
app.post ("/api/nh/upload", upload.single('myFile'), uploadImage);
app.put('/api/nh/flickr/:articleId',updateArticleForFlickr);

function updateArticleForFlickr(req,res) {
    var articleId = req.params['articleId'];
    var urlObject = req.body;
    var url = urlObject.url;

    nh_articleModel.findById(articleId)
        .then(function (article) {
            article.urlToImage = url;
            nh_articleModel.updatePublishedArticle(articleId,article)
                .then(function (status) {
                    res.sendStatus(200);
                })
        });
}

function uploadImage(req, res) {

    var articleId      = req.body.articleId;
    //var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;


    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    nh_articleModel.findById(articleId)
        .then(function (article) {
            article.urlToImage = '/project/uploads/'+filename;


            nh_articleModel.updatePublishedArticle(articleId,article)
                .then(function (status) {
                    var callbackUrl   = "/project/#!/publisher/article/edit/"+articleId;
                    res.redirect(callbackUrl);
                });
        },function (err) {
            res.send(err);
        });


}

function fetchReportedArticles(req,res) {
    nh_articleModel.fetchReportedArticles()
        .then(function (articles) {
            res.json(articles)
        },function (err) {
            res.json(err);
        })
}


function saveArticle(req,res) {
    var article = req.body;
    nh_articleModel.saveArticle(article)
        .then(function (article) {
            res.json(article);
        },function (err) {
            res.send(err);
        })
}

function updatePublishedArticle(req,res) {
    var articleId = req.params['articleId'];
    var article = req.body;
    nh_articleModel.updatePublishedArticle(articleId,article)
        .then(function (article) {
            res.json(article);
        },function (err) {
            res.send(err);
        })
}

function deleteArticle(req,res) {
    var articleId = req.params['articleId'];
    var userId = req.params['userId'];
    var articleType = req.params['articleType']
    nh_articleModel.deleteArticle(articleId,userId,articleType)
        .then(function () {
            res.sendStatus(200);
        },function (err) {
            res.send(err);
        })
}

function fetchArticlesByUserId(req,res) {
    var userId = req.params['userId'];
    var type = req.params['type'];
    nh_articleModel.fetchArticlesByUserId(userId,type)
        .then(function (articles) {
            res.json(articles);
        },function (err) {
            res.send(err);
        })
}

function fetchArticleById(req,res) {
    var articleId = req.params['articleId'];
    nh_articleModel.fetchArticleById(articleId)
        .then(function (article) {
            res.json(article);
        },function (err) {
            res.send(err);
        })
}
