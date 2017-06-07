/**
 * Created by Aditya on 6/3/2017.
 */
(function () {
    angular
        .module('POC')
        .service('dashboardService',dashboardService);

    function dashboardService($http) {

        var dashboards = [
            {_id:1,userId:1,news_media:['abc-news-au','ars-technica']}
        ]

        this.fetchArticlesBySourceId = fetchArticlesBySourceId;
        this.fetchSourcesForDashboard = fetchSourcesForDashboard;
        this.addSourceToDashboard = addSourceToDashboard;

        function addSourceToDashboard(sourceId) {
            if(typeof dashboards[0].news_media.find(function (news_media) {
                    return news_media===sourceId
                }) ==='undefined'){
                dashboards[0].news_media.push(sourceId);
            }
        }

        function fetchSourcesForDashboard(dashBoardId) {
            for (var v in dashboards){
                if(dashboards[v]._id === dashBoardId){
                    return dashboards[v].news_media
                }
            }
            return [];
        }

        function fetchArticlesBySourceId(sourceId,sortBy) {
            var apiKey = '08e099832a2e426d9bc7b2f8fa401abb';
            var url = 'https://newsapi.org/v1/articles?source='+sourceId+'&sortBy='+sortBy+'&apiKey='+apiKey;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })


        }

        function addNewsMediaToDashboard(dashBoardId,news_media_id){
            for (var v in dashboards){
                if(dashboards[v]._id === dashBoardId){
                    dashboards[v].news_media.push(news_media_id);
                }
            }

        }
    }


})()
