/**
 * Created by Aditya on 5/26/2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams,$location,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.editWebsiteId = $routeParams['websiteId'];
        model.createWebsite = createWebsite;

        function init() {
            websiteService.findAllWebsitesForUser(model.userId)
                .then(renderWebsites);


        }
        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function createWebsite(website) {
            //website.developerId = model.userId;
            websiteService.createWebsite(model.userId,website)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website');
                },function () {
                    model.message = "Error while creating new website";
                });

        }


    }
})();