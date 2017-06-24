(function () {
    angular
        .module("NH")
        .controller("nh_publishedEditArticleController")
    function nh_publishedEditArticleController($location,currentUser,$nh_articleService,$nh_userService) {
        var model = this;
        model.articleId = $routeParams['articleId'];

        model.updatePublishedArticle = updatePublishedArticle;
        function init() {
            nh_articleService.fetchArticleById(model.articleId)
                .then(function (article) {
                    model.article = article;
                })
        }

        function updatePublishedArticle(article) {

        }
    }
})()