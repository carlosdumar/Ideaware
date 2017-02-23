(function() {
  'use strict';
  angular
    .module('home.directives', [])
    .directive('myParagraf', myParagraf)
    .directive('myVideos', myVideos);

    function myParagraf() {
      var directive = {
        templateUrl: './assets/templates/views/paragraf.html',
        restrict: 'EA'
      }
      return directive;
    };
    function myVideos() {
      var directive = {
        templateUrl: './assets/templates/views/videos.html',
        restrict: 'EA'
      }
      return directive;
    };
})();
