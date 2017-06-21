(function () {
    angular
        .module("NH")
        .factory("nh_newsMediaService",nh_newsMediaService);
    function nh_newsMediaService($http) {

        var newsMedia = [];
        var selectedArticle = {};

        var api = {
            fetchAllNewsMedia:fetchAllNewsMedia,
            filterNewsMedia:filterNewsMedia,
            fetchArticlesByNewsMediaId:fetchArticlesByNewsMediaId,

            setSelectedArticle : setSelectedArticle,
            getSelectedArticle : getSelectedArticle
        };

        return api;

        function fetchAllNewsMedia() {
            var apiKey = '08e099832a2e426d9bc7b2f8fa401abb';
            var url = 'https://newsapi.org/v1/sources?language=en';

            return $http.get(url)
                .then(function (response) {
                    newsMedia = response.data.sources;
                    return newsMedia;
                });


        }
        function filterNewsMedia(inputNewsMedia){
            var newsMediaObjects = [];
            for (var v in inputNewsMedia){
                for( var u in newsMedia){
                    if(newsMedia[u].id === inputNewsMedia[v]){
                        newsMediaObjects.push(newsMedia[u]);
                    }
                }
            }
            return newsMediaObjects;
        }

        function fetchArticlesByNewsMediaId(newsMediaId,sortBy) {
            var apiKey = '08e099832a2e426d9bc7b2f8fa401abb';
            var url = 'https://newsapi.org/v1/articles?source='+newsMediaId+'&sortBy='+sortBy+'&apiKey='+apiKey;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function setSelectedArticle(article) {
            selectedArticle = article;
        }

        function getSelectedArticle(){
            return selectedArticle;
        }
    }
})()