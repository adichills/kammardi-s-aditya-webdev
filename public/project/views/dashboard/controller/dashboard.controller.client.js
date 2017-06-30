(function () {
    angular
        .module("NH")
        .controller("nh_dashBoardController",nh_dashBoardController)

    function nh_dashBoardController(currentUser,$location,nh_dashBoardService,nh_newsMediaService) {
        var model = this;

        function initializeParameters() {
            model.dashboard = {};
            model.userId = currentUser._id;
            model.articles = [];
            model.news_media = [];
            model.user_news_media = [];
            model.selectedNewsMedia = {};
            model.showMedia = true;
        }
        initializeParameters();

        model.fetchArticlesByNewsMediaId = fetchArticlesByNewsMediaId;
        model.selectNewsMedia = selectNewsMedia;
        model.selectArticle = selectArticle;
        model.viewAllNewsMedia = viewAllNewsMedia;
        model.removeNewsMedia = removeNewsMedia;

        function viewAllNewsMedia() {
            model.showMedia = true;
        }

        function removeNewsMedia(newsMediaId) {
            var index = model.dashboard.news_media.indexOf(newsMediaId);
            model.dashboard.news_media.splice(index,1);
            nh_dashBoardService.updateDashboard(model.dashboard._id,model.dashboard)
                .then(function (dashboard) {
                    console.log(dashboard);
                })
        }

        function selectNewsMedia(newsMediaId,sortBy) {
            model.showMedia = false;
            for (v in model.user_news_media){
                if (model.user_news_media[v].id === newsMediaId){
                    model.user_news_media[v].class ="active";
                    model.selectedNewsMedia = model.user_news_media[v];
                }
                else{
                    model.user_news_media[v].class = "";
                }
            }
            fetchArticlesByNewsMediaId(newsMediaId,sortBy);
        }

        function init1() {
            return nh_dashBoardService.fetchDashboardForUserId(model.userId)
                .then(function (dashboard) {
                    model.dashboard = dashboard;
                },function (err) {
                    model.message = "Error while fetching users dashboard";
                })
        }
        function init2() {
             nh_newsMediaService.fetchAllNewsMedia()
                .then(function (newsMedia) {
                    model.news_media = newsMedia;
                    model.user_news_media = getNewsMediaForUsersDashboard(model.dashboard);
                    if(model.dashboard.news_media.length >0){
                        var firstNM = model.dashboard.news_media[0];
                        var sortBy = getSortByForNewsMedia(firstNM);
                        nh_newsMediaService.fetchArticlesByNewsMediaId(firstNM,sortBy)
                            .then(function (articleObject) {
                                model.articles = articleObject.articles;
                            })
                    }
                },function (err) {
                });
        }
        

        init1();
        init2();

        function getSortByForNewsMedia(newsMediaId) {
            for (v in model.news_media){
                if(model.news_media[v].id === newsMediaId){
                   return model.news_media[v].sortBysAvailable[0]
                }
            }
        }

        function getNewsMediaForUsersDashboard(dashboard) {
            var users_news_media = [];
            for (u in dashboard.news_media){
              for (v in model.news_media){
                  if(model.news_media[v].id === dashboard.news_media[u]){
                      var news_media = model.news_media[v];
                      news_media.class = "";
                      users_news_media.push(model.news_media[v]);
                  }
              }
          }
            if(users_news_media.length >0){
                users_news_media[0].class = "active";
            }
            return users_news_media;

        }


        
        function fetchArticlesByNewsMediaId(newsMediaId,sortBy) {
            nh_newsMediaService.fetchArticlesByNewsMediaId(newsMediaId,sortBy)
                .then(function (articlesObject) {
                    model.articles = articlesObject.articles;
                })
        }

        function selectArticle(article) {
            nh_newsMediaService.setSelectedArticle(article);
            $location.url('/article/selectedArticle');
        }
    }
})()