/**
 * Created by Aditya on 6/3/2017.
 */
(function () {
    angular
        .module('POC')
        .controller('Controller3',Controller3);

    function Controller3($routeParams,articlesService,newsMediaService,$http) {

        var model = this;
        model.articleObject = {}
        model.articles = {}
        model.sourceId = $routeParams['newsMediaId'];
        model.sortBy = $routeParams['sortBy'];
        model.class = 'active';

        function init() {
            console.log("Init Called");
            articlesService.fetchArticlesBySourceId(model.sourceId,model.sortBy)
                .then(function (artilcesObject) {
                    model.articleObject = artilcesObject;
                    model.articles = artilcesObject.articles;
                    console.log(model.articles);
                },function () {
                    model.message = "Error while recieving articles";
                })
        }
        init();
    }
})()