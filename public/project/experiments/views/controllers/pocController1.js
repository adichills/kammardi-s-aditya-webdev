/**
 * Created by Aditya on 6/2/2017.
 */
(function () {
    angular
        .module('POC')
        .controller('Controller1', Controller1);

    function Controller1($http,$routeParams,newsMediaService,dashboardService) {

        var model = this;

        model.sourcObject = {};
        model.sources = [];
        model.mainArea = '';
        model.searchResults = [];

        model.searchForSources = searchForSources;
        model.addSourceToDashboard = addSourceToDashboard;

        function addSourceToDashboard(sourceId) {
            dashboardService.addSourceToDashboard(sourceId);
            model.message = "News Media added to dashboard";
        }

        function init() {

            newsMediaService.fetchAllNewsMedia()
                .then(function (newsMedia) {
                    model.sources = newsMedia;
                },function () {
                    console.log("error");
                    model.message = "Error while getting the sources";
                })
            // var url = 'https://newsapi.org/v1/sources?language=en';
            // $http.get(url).then(function (response) {
            //     model.sourcObject = response.data;
            //     model.sources = model.sourcObject.sources;
            //     console.log(model.sources);
            // },function () {
            //     model.message = "Error while getting the sources";
            // })
        }
        init();

        function searchForSources(searchText) {
            model.searchResults = [];
            model.message = null;
            if(searchText==='' || searchText === null || typeof searchText ==='undefined'){
                model.searchResults = model.sources;
            }
            else{
                for (var v in model.sources){
                    var res = model.sources[v].name.search(new RegExp(searchText,"i"));
                    if(res!==-1){
                        model.searchResults.push(model.sources[v]);
                    }
                }
            }



        }
    }
})()