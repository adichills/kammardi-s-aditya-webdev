/**
 * Created by Aditya on 5/26/2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController(currentUser,$routeParams,$location,
                                   pageService) {
        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.editpageId = $routeParams['pageId'];
        model.createPage = createPage;

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);

        }
        init();

        function createPage(page) {

            if(typeof page === 'undefined' ||page.name===""|| page.name === null || typeof page.name === 'undefined'){
                model.error = "Page name cannot be empty";
                return;
            }

            pageService.createpage(model.websiteId,page)
                .then(function () {
                    $location.url('/website/'+model.websiteId + '/page');
                });

        }


    }
})();