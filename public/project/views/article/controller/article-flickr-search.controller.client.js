(function () {
    angular
        .module('NH')
        .controller('nh_FlickrImageSearchController',nh_FlickrImageSearchController);

    function nh_FlickrImageSearchController(currentUser,$routeParams,$location,nh_FlickrService,nh_articleService) {
            var model = this;
            model.searchPhotos = searchPhotos;
            model.selectPhoto = selectPhoto;

            function init() {

                model.articleId = $routeParams['articleId'];
                model.userId = currentUser._id;

            }
            init();

            function searchPhotos(searchTerm) {

                nh_FlickrService
                    .searchPhotos(searchTerm)
                    .then(function(response) {
                        data = response.data.replace("jsonFlickrApi(","");
                        data = data.substring(0,data.length - 1);
                        data = JSON.parse(data);
                        model.photos = data.photos;
                    });


            };
            
            function selectPhoto(photo) {
                var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
                url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
                nh_articleService.updateArticleForFlickr(model.articleId,{'url':url})
                    .then(function () {
                        $location.url('/publisher/article/edit/'+model.articleId);
                    },
                    function () {
                        model.message = "Error while updating the photo url";
                    })

            }
    }
})()