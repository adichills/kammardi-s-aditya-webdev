/**
 * Created by Aditya on 5/26/2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams,$location,
                                   pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.editPageId = $routeParams['pageId'];
        model.deletePage = deletePage;
        model.updatePage = updatePage;

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
            model.editPage = pageService.findpageById(model.editPageId);
        }
        init();

        function deletePage(pageId) {
            pageService.deletepage(pageId);
            $location.url('/user/'+model.userId+'/website/' + model.websiteId + '/page');
        }
        function updatePage(pageId,page){
            pageService.updatepage(pageId,page);
            $location.url('/user/'+model.userId+'/website/' + model.websiteId + '/page');
        }


    }
})();