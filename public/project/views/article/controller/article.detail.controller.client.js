(function () {
    angular
        .module('NH')
        .controller("nh_articleDetailController",nh_articleDetailController);

    function nh_articleDetailController(currentUser,$location,$routeParams,nh_newsMediaService) {

        var model = this;
        model.userId = currentUser._id;
        model.articleId = $routeParams['articleId'];
        model.article = {};

        function init(){
            if(model.articleId ==='selectedArticle'){
               model.article =  nh_newsMediaService.getSelectedArticle();
            }
        }
        init();
    }
})()