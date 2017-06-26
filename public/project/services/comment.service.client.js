(function () {
    angular
        .module("NH")
        .factory("nh_commentService",nh_commentService);

    function nh_commentService($http) {
        var api = {
            fetchCommentsForArticle:fetchCommentsForArticle,
            addComment : addComment,
            removeComment:removeComment,
            updateComment:updateComment,
            fetchReportedComments:fetchReportedComments
        }
        return api;

        function fetchReportedComments() {
            var url = '/api/nh/admin/reportedComments';
            return $http.get(url)
                .then(sendResponseData);
        }

        function fetchCommentsForArticle(articleId) {
            var url = '/api/nh/comment/article/'+articleId;
            return $http.get(url)
                .then(sendResponseData)
        }

        function removeComment(commentId,userId) {
            var url= "/api/nh/comment/"+commentId + "/" + userId;
            return $http.delete(url)
                .then(sendResponseData);
        }

        function sendResponseData(response) {
            return response.data;
        }
        function updateComment(commentId,comment) {
            var url = "/api/nh/comment/"+commentId;
            return $http.put(url,comment)
                .then(sendResponseData);
        }

        function addComment(comment) {
            var url = '/api/nh/comment';
            return $http.post(url,comment)
                .then(sendResponseData);
        }
    }
})()