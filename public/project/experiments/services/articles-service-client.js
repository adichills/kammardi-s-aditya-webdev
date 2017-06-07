/**
 * Created by Aditya on 6/3/2017.
 */
(function () {
    angular
        .module('POC')
        .service('articlesService',articlesService);

    function articlesService($http) {
        this.fetchArticlesBySourceId = fetchArticlesBySourceId;

        function fetchArticlesBySourceId(sourceId,sortBy) {
            var apiKey = '08e099832a2e426d9bc7b2f8fa401abb';
            var url = 'https://newsapi.org/v1/articles?source='+sourceId+'&sortBy='+sortBy+'&apiKey='+apiKey;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })


        }
    }


})()
