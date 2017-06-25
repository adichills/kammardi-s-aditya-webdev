(function () {
    angular
        .module('NH')
        .controller("nh_articleDetailController",nh_articleDetailController);

    function nh_articleDetailController(currentUser,$location,$routeParams,nh_newsMediaService,nh_articleService,nh_commentService) {

        var model = this;
        model.userId = currentUser._id;
        model.articleId = $routeParams['articleId'];
        model.article = {};
        model.comments = [];

        model.saveArticle = saveArticle;
        model.articleSaved = false;
        model.addComment = addComment;
        model.removeComment = removeComment;
        model.reportComment = reportComment;

        function init(){
            if(model.articleId ==='selectedArticle'){
               model.article =  nh_newsMediaService.getSelectedArticle();
            }
            else{
                return nh_articleService.fetchArticleById(model.articleId)
                    .then(function (article) {
                        model.article = article;
                        model.articleSaved = true;
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
            article._user = model.userId;
            article.articleType = "NEWS";
            nh_articleService.saveArticle(article)
                .then(function (article) {
                    model.message = "Article Saved";
                    model.articleSaved = true;
                    model.articleId = article._id;
                })
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