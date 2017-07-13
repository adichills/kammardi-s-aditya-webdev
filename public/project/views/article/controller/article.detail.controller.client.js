(function () {
    angular
        .module('NH')
        .controller("nh_articleDetailController",nh_articleDetailController);

    function nh_articleDetailController(currentUser,$location,$routeParams,nh_newsMediaService,nh_articleService,nh_commentService) {

        var model = this;

        function initializeParameters() {
            model.userId = currentUser._id;
            model.articleId = $routeParams['articleId'];
            model.article = {};
            model.comments = [];
            model.articleSaved = false;
            model.showReportArticle = false;
            model.showDeleteArticle = false;

        }
        initializeParameters();


        model.saveArticle = saveArticle;

        model.addComment = addComment;
        model.removeComment = removeComment;
        model.reportComment = reportComment;
        model.deleteArticle = deleteArticle;
        model.reportArticle = reportArticle;




        function init(){

            if (model.articleId !=='selectedArticle'){
                if(model.userId === null || typeof model.userId === 'undefined'){
                    $location.url('/');
                }
            }

            if(model.articleId ==='selectedArticle'){
               model.article =  nh_newsMediaService.getSelectedArticle();
               if (typeof model.article.title ==='undefined' || model.article.title === null){
                   //redirect to newshub home
                   $location.url("/");
               }
            }
            else{
                return nh_articleService.fetchArticleById(model.articleId)
                    .then(function (article) {
                        model.article = article;
                        model.articleSaved = true;
                        if(model.userId === article._user){
                            model.showDeleteArticle = true;
                            model.showReportArticle = false;
                        }
                        else{
                            model.showDeleteArticle = false;
                            model.showReportArticle = true;
                        }
                    },function (err) {
                        model.message = "Error while fetching the article";
                    })
                    .then(function () {
                        fetchCommentsForArticle(model.articleId);

                    })
            }
        }
        init();

        function saveArticle(article) {
            if(model.userId){
                article._user = model.userId;
                article.articleType = "NEWS";
                nh_articleService.saveArticle(article)
                    .then(function (article) {
                        model.message = "Article Saved";
                        model.articleSaved = true;
                        model.articleId = article._id;
                    })
            }
            else{
                model.message = "Login to save this article";
                return;
            }

        }

        function removeComment(commentId,userId) {
            nh_commentService.removeComment(commentId,userId)
                .then(function () {
                    fetchCommentsForArticle(model.articleId)
                        .then(function () {

                        },function (err) {
                            console.log(err);
                        })
                })
        }
        function deleteArticle(articleId,userId,articleType) {
            nh_articleService.deleteArticle(articleId,userId,articleType)
                .then(function (msg) {
                    if(articleType ==="NEWS"){
                        $location.url("/saved/article")
                    }
                    else{
                        $location.url("/publisher/article")
                    }

                })
        }
        function reportArticle(articleId,article) {
            article.reported = true;
            nh_articleService.updatePublishedArticle(articleId,article)
                .then(function (article) {
                    model.message = "Article Reported";
                },function () {
                    model.message = "error while reporting article";

                })
        }
        function reportComment(commentId,comment) {
            comment.reported = true;
            nh_commentService.updateComment(commentId,comment)
                .then(function (comment) {
                    fetchCommentsForArticle(model.articleId)
                        .then(function () {

                        },function (err) {
                            console.log(err);
                        })
                })
        }

        function addComment(newComment) {
            var newCommentObject = {
                _user:model.userId,
                _article : model.articleId,
                text:newComment
            };
            nh_commentService.addComment(newCommentObject)
                .then(function (comment) {
                    fetchCommentsForArticle(model.articleId)
                        .then(function () {

                        },function (err) {
                            console.log(err);
                        })
                })
        }
        function fetchCommentsForArticle(articleId) {
            return nh_commentService.fetchCommentsForArticle(articleId)
                .then(function (comments) {
                    model.comments = comments;
                })
        }
    }
})()