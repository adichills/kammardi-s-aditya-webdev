(function () {
    angular
        .module("NH")
        .factory("nh_articleService",nh_articleService)

    function nh_articleService($http) {

        var api = {
            saveArticle:saveArticle,
            fetchArticlesByUserId:fetchArticlesByUserId,
            fetchArticleById:fetchArticleById
        }
        return api;


        function saveArticle(article) {
            var url = "/api/nh/article";
            return $http.post(url,article)
                .then(sendResponseData);
        }
        function fetchArticlesByUserId(userId) {
            var url = "/api/nh/article/" +userId;
            return $http.get(url)
                .then(sendResponseData);
        }

        function fetchArticleById(articleId) {
            var url = "/api/nh/savedArticle/"+articleId;
            return $http.get(url)
                .then(sendResponseData);
        }

        function sendResponseData(response) {
            return response.data;
        }
    }
})()