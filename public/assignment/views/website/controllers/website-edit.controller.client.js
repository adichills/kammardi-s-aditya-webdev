/**
 * Created by Aditya on 5/26/2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController(currentUser,$routeParams,$location,
                                   websiteService) {
        var model = this;

        model.userId = currentUser._id;
        model.editWebsiteId = $routeParams['websiteId'];
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init() {
            websiteService.findAllWebsitesForUser(model.userId)
                .then(renderWebsites);
            websiteService.findWebsiteById(model.editWebsiteId)
                .then(renderWebsite);
        }
        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }
        function renderWebsite(website){
            model.editWebsite = website;
        }

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId)
                .then(function () {
                    $location.url('/website');
                },function () {
                    model.message = "Error while deleting the website";
                });

        }
        function updateWebsite(websiteId,website){

            if(typeof website === 'undefined' || website.name === null ||website.name ==="" || typeof website.name === 'undefined'){
                model.error = "Website name cannot be empty";
                return;
            }

            websiteService.updateWebsite(websiteId,website)
                .then(function () {
                    $location.url('/website');
                },function () {
                    model.message = "Error while updating the website";
                });

        }


    }
})();