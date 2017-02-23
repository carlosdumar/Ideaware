(function() {
  angular
    .module('home.controllers', [])
    .controller('HomeController', HomeController)

    HomeController.$inject = ['homeFactory', '$scope', '$sce'];

    function HomeController(homeFactory, $scope, $sce) {
      var vm = this;
      vm.videos = [];

      activate();

      function activate() {
            getVideos();
        }

      function getVideos() {
        return homeFactory.getVideos()
          .then(function(data) {
            vm.videos = data;
            vm.videos.url = createURl(vm.videos.items);
            return vm.videos;
          })
          .catch(function(data) {
            $scope.errorGetVideos = data;
          })
      }
      $scope.getVideosByName = function(name, e) {
        if (e.keyCode == 13 && name != null) {
          e.preventDefault();
          return homeFactory.getVideosByName(name)
            .then(function(data) {
              vm.videos = data;
              vm.videos.url = createURl(vm.videos.items);
              return vm.videos;
            })
            .catch(function(data) {
              $scope.errorgetVideosName = data;
            })
        }
      }
      $scope.getVideosByCategory = function(category) {
        return homeFactory.getVideosByCategory(category)
          .then(function(data) {
            vm.videos = data;
            vm.videos.url = createURl(vm.videos.items);
            return vm.videos;
          })
          .catch(function(data) {
            $scope.errorgetVideosByCategory = data;
          })
      }
    }
    function createURl(data) {
      var video = [];
      data.filter(function(element) {
        element.url = 'https://www.youtube.com/embed/' + element.id.videoId + '?controls=1';
      })
      return data;
    }
})();
module.exports;
