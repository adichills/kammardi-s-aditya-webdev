/**
 * Created by Aditya on 5/26/2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);

    function pageListController(currentUser,$routeParams,
                                   pageService) {
        var model = this;

        model.websiteId = $routeParams['websiteId'];
        model.userId = currentUser._id;

        function init() {
            pageService.findPageByWebsiteId(model.websiteId)
                .then(renderPages);

        }
        init();

        function renderPages(pages) {
            model.pages = pages;
        }
    }
})();