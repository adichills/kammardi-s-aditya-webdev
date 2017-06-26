(function () {
   angular
       .module("NH")
       .controller("nh_manageCommentsController",nh_manageCommentsController);

   function nh_manageCommentsController($location,currentUser,nh_commentService) {

       var model = this;
       model.comments = [];

       model.removeComment = removeComment;

       function init() {
           nh_commentService.fetchReportedComments()
               .then(function (comments) {
                   model.comments = comments;
               },function (err) {
                   model.message = "Error while Retreiving comments";
               })
       }
       init();

       function removeComment(commentId,userId) {
           nh_commentService.removeComment(commentId,userId)
               .then(function () {
                   init();

               })
       }
   }
})()