/**
 * Created by Aditya on 5/26/2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];

        function init() {
            websiteService.findAllWebsitesForUser(model.userId)
                .then(renderWebsites);
        }
        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }
    }
})();