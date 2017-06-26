(function () {
    angular
        .module("NH")
        .controller("nh_publishedEditArticleController",nh_publishedEditArticleController)
    function nh_publishedEditArticleController($location,currentUser,nh_articleService,nh_userService,$routeParams) {
        var model = this;
        model.articleId = $routeParams['articleId'];
        model.userId = currentUser._id;

        model.updatePublishedArticle = updatePublishedArticle;
        model.deleteArticle = deleteArticle;
        function init() {
            nh_articleService.fetchArticleById(model.articleId)
                .then(function (article) {
                    model.article = article;
                })
        }
        init();

        function updatePublishedArticle(article) {
            nh_articleService.updatePublishedArticle(article._id,article)
            .then(function (article) {
                $location.url("/publisher/article");
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
    }
})()