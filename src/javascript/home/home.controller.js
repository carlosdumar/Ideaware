(function() {
  /**
   * 
   */
  angular
    .module('home.controllers', [])
    .controller('HomeController', HomeController)

    HomeController.$inject = ['homeFactory', '$scope'];

    function HomeController(homeFactory, $scope) {
      var vm = this;
      vm.videos = [];
      
      $scope.getVideosByName = getVideosByName;
      $scope.getVideosByCategory = getVideosByCategory;
      
      activate();

      function activate() {
            getVideos();
        }
      /**
       * @desc get all the videos
       * 
       * @returns videos
       */
      function getVideos() {
        return homeFactory.getVideos()
          .then(function(data) {
            vm.videos = data;
            vm.videos.url = createURl(vm.videos.items);
            return vm.videos;
          })
          .catch(function(data) {
            $scope.errorgetVideos = data;
          })
      }
      /**
       * Get videos filtered by video's name
       * 
       * @param {any} name - Name of the video.
       * @param {any} e - Evento
       * @returns Videos by names
       */
      function getVideosByName(name, e) {
        if (e.keyCode == 13 && name != null) {
          e.preventDefault();
          return homeFactory.getVideosByName(name)
            .then(function(data) {
              vm.videos = data;
              vm.videos.url = createURl(vm.videos.items);
              return vm.videos;
            })
            .catch(function(data) {
              $scope.errorgetVideos = data;
            })
        }
      }
      /**
       * 
       * 
       * @param {any} category 
       * @returns 
       */
      function getVideosByCategory(category) {
        return homeFactory.getVideosByCategory(category)
          .then(function(data) {
            vm.videos = data;
            vm.videos.url = createURl(vm.videos.items);
            return vm.videos;
          })
          .catch(function(data) {
            $scope.errorgetVideos = data;
          })
      }
    }
    /**
     * 
     * 
     * @param {any} data 
     * @returns 
     */
    function createURl(data) {
      var video = [];
      data.filter(function(element) {
        element.url = 'https://www.youtube.com/embed/' + element.id.videoId + '?controls=1';
      })
      return data;
    }
})();
module.exports;
