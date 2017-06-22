(function () {
    angular
        .module("NH")
        .factory("nh_commentService",nh_commentService);

    function nh_commentService($http) {
        var api = {
            fetchCommentsForArticle:fetchCommentsForArticle,
            addComment : addComment
        }
        return api;

        function fetchCommentsForArticle(articleId) {
            var url = '/api/nh/comment/article/'+articleId;
            return $http.get(url)
                .then(sendResponseData)
        }

        function sendResponseData(response) {
            return response.data;
        }

        function addComment(comment) {
            var url = '/api/nh/comment';
            return $http.post(url,comment)
                .then(sendResponseData);
        }
    }
})()