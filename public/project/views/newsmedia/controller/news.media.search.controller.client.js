(function () {
    angular
        .module("NH")
        .controller("nh_newsMediaController",nh_newsMediaController)

    function nh_newsMediaController(currentUser,$location,nh_newsMediaService,nh_dashBoardService) {
        var model = this;
        model.newsMedia = [];
        model.searchResults =[];
        model.searchForNewsMedia = searchForNewsMedia;
        model.dashboard = {}
        
        model.addNewsMediaToDashboard = addNewsMediaToDashboard;
        if(currentUser._id){
            model.userId = currentUser._id;
            getDashboard();
        }

        function getDashboard() {
            nh_dashBoardService.fetchDashboardForUserId(model.userId)
                .then(function (dashboard) {
                    model.dashboard = dashboard;
                })
        }

        function init() {
            nh_newsMediaService.fetchAllNewsMedia()
                .then(function (sources) {
                    model.newsMedia = sources
                },function () {
                    model.message = "Error while retrieving the news media";
                })
        }
        init();

        function isInArray(value, array) {
            return array.indexOf(value) > -1;
        }
        
        function addNewsMediaToDashboard(news_mediaId) {
            if (model.dashboard.news_media){
                if(!isInArray(news_mediaId,model.dashboard.news_media)){
                    model.dashboard.news_media.push(news_mediaId);
                }
                else{
                    model.message = "News media already present"
                    return
                }


            }
            else{
                model.message="Login to add News media to your dashboard"
            }

            nh_dashBoardService.updateDashboard(model.dashboard._id,model.dashboard)
                .then(function () {
                    model.message="Media added to dashboard"
                })
        }

        function searchForNewsMedia(searchText) {
            model.searchResults = [];
            model.message = null;
            if(searchText==='' || searchText === null || typeof searchText ==='undefined'){
                model.searchResults = model.newsMedia;
            }
            else{
                for (var v in model.newsMedia){
                    var res = model.newsMedia[v].name.search(new RegExp(searchText,"i"));
                    if(res!==-1){
                        model.searchResults.push(model.newsMedia[v]);
                    }
                }
            }

        }

    }
})()