/**
 * Created by Aditya on 5/26/2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams,$location,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.editWebsiteId = $routeParams['websiteId'];
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
            model.editWebsite = websiteService.findWebsiteById(model.editWebsiteId);
        }
        init();

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/'+model.userId+'/website');
        }
        function updateWebsite(websiteId,website){
            websiteService.updateWebsite(websiteId,website);
            $location.url('/user/'+model.userId+'/website');
        }


    }
})();