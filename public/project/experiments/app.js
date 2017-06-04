/**
 * Created by Aditya on 6/2/2017.
 */
(function () {
    angular
        .module('POC',['ngRoute'])
        .directive('backImg', function(){
        return function(scope, element, attrs){
            var url = attrs.backImg;
            element.css({
                'background-image': 'url(' + url +')',
                'background-size' : 'cover'
            });
        };
    });



})()

