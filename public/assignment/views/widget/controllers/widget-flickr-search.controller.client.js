(function () {
    angular
        .module('WAM')
        .controller('FlickrImageSearchController',FlickrImageSearchController);

    function FlickrImageSearchController($routeParams,$location,FlickrService,widgetService) {
            var model = this;
            model.searchPhotos = searchPhotos;
            model.selectPhoto = selectPhoto;

            function init() {
                model.widgetId = $routeParams['widgetId'];
                model.pageId = $routeParams['pageId'];
                model.websiteId = $routeParams['websiteId'];
                model.userId = $routeParams['userId'];

            }
            init();

            function searchPhotos(searchTerm) {

                FlickrService
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
                widgetService.updateWidgetForFlickr(model.pageId,model.widgetId,{'url':url})
                    .then(function () {
                        $location.url('/user/'+model.userId+'/website/'+model.websiteId + '/page/' + model.pageId + '/widget/'+model.widgetId);
                    },
                    function () {
                        model.message = "Error while updating the photo url";
                    })

            }
    }
})()