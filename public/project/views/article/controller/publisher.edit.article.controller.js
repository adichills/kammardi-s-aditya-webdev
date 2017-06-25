(function () {
    angular
        .module("NH")
        .controller("nh_publishedEditArticleController",nh_publishedEditArticleController)
    function nh_publishedEditArticleController($location,currentUser,nh_articleService,nh_userService,$routeParams) {
        var model = this;
        model.articleId = $routeParams['articleId'];
        model.userId = currentUser._id;

        model.updatePublishedArticle = updatePublishedArticle;
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
    }
})()