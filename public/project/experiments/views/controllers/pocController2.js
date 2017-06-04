/**
 * Created by Aditya on 6/3/2017.
 */
(function () {
   angular
       .module('POC')
       .controller('Controller2',Controller2);

   function Controller2($routeParams,dashboardService,$http) {

       var model = this;
       model.articleObject = {}
       model.articles = {}

       function init() {
           dashboardService.fetchArticlesBySourceId('the-next-web')
               .then(function (artilcesObject) {
                   model.articleObject = artilcesObject;
                   model.articles = artilcesObject.articles;
                   console.log(model.articles);
               },function () {
                   model.message = "Error while recieving articles";
               })
       }
       init();
   }
})()