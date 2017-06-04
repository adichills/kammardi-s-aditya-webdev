/**
 * Created by Aditya on 5/26/2017.
 */
(function () {
    angular
        .module('WAM')
        .service('pageService', pageService);

    function pageService($http) {

        this.findpageById = findpageById;
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.deletepage = deletepage;
        this.createpage = createpage;
        this.updatepage = updatepage;



        function sendResponseData(response) {
            return response.data;
        }

        function findPageByWebsiteId(websiteId) {

            var url = "/api/assignment/website/"+websiteId+"/page";
            return $http.get(url)
                .then(sendResponseData);

        }


        function updatepage(pageId,page) {

            var url = "/api/assignment/page/"+pageId;
            return $http.put(url,page)
                .then(sendResponseData);

        }

        function createpage(websiteId,page) {

            var url = '/api/assignment/website/'+websiteId + '/page';
            return $http.post(url,page)
                .then(sendResponseData);

        }

        function deletepage(pageId) {

            var url = '/api/assignment/page/'+pageId;
            return $http.delete(url)
                .then(sendResponseData);

        }

        function findpageById(pageId) {
            var url = '/api/assignment/page/'+pageId;
            return $http.get(url)
                .then(sendResponseData);

        }

        
    }
})();