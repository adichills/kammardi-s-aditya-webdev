(function () {
    angular
        .module("NH")
        .factory("nh_adminService",nh_adminService)

    function nh_adminService($http) {

        var api = {
            getAdminStats:getAdminStats
        }
        return api;

        function getAdminStats() {
            var url = "/api/nh/admin/stats";
            return $http.get(url)
                .then(sendResponseData);
        }


        function sendResponseData(response) {
            return response.data;
        }
    }
})()