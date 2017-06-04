/**
 * Created by Aditya on 5/26/2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams,$location,
                                   pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.editpageId = $routeParams['pageId'];
        model.createPage = createPage;

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);

        }
        init();

        function createPage(page) {

            pageService.createpage(model.websiteId,page)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId + '/page');
                });

        }


    }
})();