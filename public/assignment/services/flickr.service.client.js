(function () {
   angular
       .module('WAM')
       .service('FlickrService',FlickrService);

   function FlickrService($http) {

       this.searchPhotos = searchPhotos;
       var key = "3a8674efb29b5f538ffd252fa0166a53";
       var secret = "2117b07b77589585";
       var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

       function searchPhotos(searchTerm) {
           var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
           return $http.get(url);
       }

   }
})();