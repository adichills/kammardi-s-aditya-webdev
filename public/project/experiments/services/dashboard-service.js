/**
 * Created by Aditya on 6/3/2017.
 */
(function () {
    angular
        .module('POC')
        .service('dashboardService',dashboardService);

    function dashboardService($http) {
        this.fetchArticlesBySourceId = fetchArticlesBySourceId;

        function fetchArticlesBySourceId(sourceId) {
            var apiKey = '08e099832a2e426d9bc7b2f8fa401abb';
            var url = 'https://newsapi.org/v1/articles?source='+sourceId+'&sortBy=latest&apiKey='+apiKey;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })


        }
    }


})()
