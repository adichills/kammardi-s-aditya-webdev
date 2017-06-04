/**
 * Created by Aditya on 5/26/2017.
 */
(function () {
    angular
        .module('WAM')
        .service('websiteService', websiteService);

    function websiteService($http) {
        this.findAllWebsitesForUser = findAllWebsitesForUser;
        this.findWebsiteById = findWebsiteById;
        this.deleteWebsite = deleteWebsite;
        this.createWebsite = createWebsite;
        this.updateWebsite = updateWebsite;



        function updateWebsite(websiteId,website) {

            var url = '/api/assignment/website/'+websiteId;
            return $http.put(url,website)
                .then(sendResponseData);


        }
        function findWebsiteById(websiteId) {
            var url = '/api/assignment/website/'+websiteId;
            return $http.get(url)
                .then(sendResponseData);
        }

        function createWebsite(userId,website) {
            var url = '/api/assingment/'+userId+'/website';
            return $http.post(url,website)
                .then(sendResponseData);


        }

        function deleteWebsite(websiteId) {

            var url = '/api/assignment/website/'+websiteId;
            return $http.delete(url)
                .then(sendResponseData);


        }



        function findAllWebsitesForUser(userId) {
            var url = "/api/assignment/user/"+userId+"/website";

            return $http.get(url)
                .then(sendResponseData);


        }

        function sendResponseData(response) {
            return response.data;
        }
    }
})();