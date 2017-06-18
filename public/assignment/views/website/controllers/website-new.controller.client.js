/**
 * Created by Aditya on 5/26/2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController(currentUser,$routeParams,$location,
                                   websiteService) {
        var model = this;

        model.userId = currentUser._id;
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

            if(typeof website === 'undefined' || website.name === null || typeof website.name === 'undefined'){
                model.error = "Website name cannot be empty";
                return;
            }

            websiteService.createWebsite(model.userId,website)
                .then(function () {
                    $location.url('/website');
                },function () {
                    model.message = "Error while creating new website";
                });

        }


    }
})();