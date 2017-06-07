/**
 * Created by Aditya on 6/3/2017.
 */
(function () {
   angular
       .module('POC')
       .controller('Controller2',Controller2);

   function Controller2($routeParams,dashboardService,newsMediaService,$http) {

       var model = this;
       model.articleObject = {}
       model.articles = {}
       model.class = 'active';
       model.sourcesForDashboard = []
       model.newsMediaId = $routeParams['newsMediaId'];
       model.sortBy = $routeParams['sortBy'];


       function init() {



           if(model.newsMediaId === 'default'){
               model.newsMediaId = 'abs-news-au';
           }

          var newsMediaObjects =  newsMediaService.filterNewsMedia(dashboardService.fetchSourcesForDashboard(1));

           console.log(newsMediaObjects);

           for (var v in newsMediaObjects){
               var sourceForDashboard = {};
               if(newsMediaObjects[v].id === model.newsMediaId){
                   sourceForDashboard.class = 'active'
               }
               else{
                   sourceForDashboard.class = '';
               }
               sourceForDashboard.id = newsMediaObjects[v].id;
               sourceForDashboard.name = newsMediaObjects[v].name;
               sourceForDashboard.sortBy = newsMediaObjects[v].sortBysAvailable[0];
               model.sourcesForDashboard.push(sourceForDashboard);
           }


           dashboardService.fetchArticlesBySourceId(model.newsMediaId,model.sortBy)
               .then(function (artilcesObject) {
                   model.articleObject = artilcesObject;
                   model.articles = artilcesObject.articles;
                  // console.log(model.articles);
               },function () {
                   model.message = "Error while recieving articles";
               })
       }
       init();
   }
})()