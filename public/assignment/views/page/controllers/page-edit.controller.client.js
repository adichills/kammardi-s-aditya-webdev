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
            pageService.findPageByWebsiteId(model.websiteId)
                .then(renderPages);
            pageService.findpageById(model.editPageId)
                .then(renderPage);
        }
        init();

        function deletePage(pageId) {

            pageService.deletepage(pageId)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/' + model.websiteId + '/page');
                },function () {
                    model.message = "Error while deleting the page";
                });

        }
        function updatePage(pageId,page){
            pageService.updatepage(pageId,page)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/' + model.websiteId + '/page');
                },function () {
                    model.message = "Error while updating the page";
                });

        }

        function renderPages(pages) {
            model.pages = pages;
        }
        function renderPage(page) {
            model.editPage = page;
        }


    }
})();