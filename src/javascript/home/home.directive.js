(function() {
  'use strict';
  /**
   * 
   */
  angular
    .module('home.directives', [])
    .directive('myParagraf', myParagraf)
    .directive('myVideos', myVideos);
    
    /**
     * 
     * 
     * @returns 
     */
    function myParagraf() {
      var directive = {
        templateUrl: './assets/templates/views/paragraf.html',
        restrict: 'EA'
      }
      return directive;
    };
    /**
     * 
     * 
     * @returns 
     */
    function myVideos() {
      var directive = {
        templateUrl: './assets/templates/views/videos.html',
        restrict: 'EA'
      }
      return directive;
    };
})();
