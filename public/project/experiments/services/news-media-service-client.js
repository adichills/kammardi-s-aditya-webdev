/**
 * Created by Aditya on 6/6/2017.
 */
/**
 * Created by Aditya on 6/3/2017.
 */
(function () {
    angular
        .module('POC')
        .service('newsMediaService',newsMediaService);

    function newsMediaService($http) {
        this.fetchAllNewsMedia = fetchAllNewsMedia;
        this.filterNewsMedia = filterNewsMedia;
        var newsMedia = [];

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
    }


})()
