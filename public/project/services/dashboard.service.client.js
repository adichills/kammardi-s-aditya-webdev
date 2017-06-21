(function () {
    angular
        .module('NH')
        .factory("nh_dashBoardService",nh_dashBoardService);

    function nh_dashBoardService($http) {

        var api = {
            fetchDashboardForUserId : fetchDashboardForUserId,
            updateDashboard : updateDashboard

        }
        return api;

        function fetchDashboardForUserId(userId) {
            var url = "/api/nh/dashboard/"+ userId;
            return $http.get(url)
                .then(sendResponseData);
        }



        function sendResponseData(response) {
            return response.data;
        }
        function updateDashboard(dashboardId,dashboard) {
            var url = '/api/nh/dashboard/'+ dashboardId;
            return $http.put(url,dashboard)
                .then(sendResponseData);
        }
    }
})()