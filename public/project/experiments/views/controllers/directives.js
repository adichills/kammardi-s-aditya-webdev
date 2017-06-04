/**
 * Created by Aditya on 6/3/2017.
 */
(function () {
    angular
        .module['POC']
        .directive('backImg',backImg);
    function backImg() {
        return function(scope, element, attrs){
            var url = attrs.backImg;
            element.css({
                'background-image': 'url(' + url +')',
                'background-size' : 'cover'
            });
        };
    }
})