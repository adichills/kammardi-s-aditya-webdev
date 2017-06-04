/**
 * Created by Aditya on 6/2/2017.
 */
(function () {
    angular
        .module('POC')
        .controller('Controller1', Controller1);

    function Controller1($http,$routeParams) {

        var model = this;

        model.sourcObject = {};
        model.sources = [];
        model.mainArea = '';

        function init() {
            var url = 'https://newsapi.org/v1/sources?language=en';
            $http.get(url).then(function (response) {
                model.sourcObject = response.data;
                model.sources = model.sourcObject.sources;
                console.log(model.sources);
            },function () {
                model.message = "Error while getting the sources";
            })
        }
        init();


    }
})()