(function () {
    angular
        .module("NH")
        .factory("nh_articleService",nh_articleService)

    function nh_articleService($http) {

        var api = {
            saveArticle:saveArticle,
            fetchArticlesByUserId:fetchArticlesByUserId,
            fetchArticleById:fetchArticleById,
            updatePublishedArticle:updatePublishedArticle,
            deleteArticle:deleteArticle,
            updateArticleForFlickr:updateArticleForFlickr
        }
        return api;


        function saveArticle(article) {
            var url = "/api/nh/article";
            return $http.post(url,article)
                .then(sendResponseData);
        }
        function fetchArticlesByUserId(userId,type) {
            var url = "/api/nh/article/" +userId+"/"+type;
            return $http.get(url)
                .then(sendResponseData);
        }


        function fetchArticleById(articleId) {
            var url = "/api/nh/savedArticle/"+articleId;
            return $http.get(url)
                .then(sendResponseData);
        }
        function updatePublishedArticle(articleId,article) {
            var url = "/api/nh/publishedArticle/" + articleId;
            return $http.put(url,article)
                .then(sendResponseData);
        }
        function deleteArticle(articleId) {
            var url = "/api/nh/publishedArticle/" + articleId;
            return $http.delete(url)
                .then(sendResponseData);
        }

        function updateArticleForFlickr(articleId,urlObject) {
            var url = '/api/nh/flickr/'+articleId;
            return $http.put(url,urlObject)
                .then(sendResponseData);
        }

        function sendResponseData(response) {
            return response.data;
        }
    }
})()