(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  'use strict';

  angular
  .module('IdeawareApp',['ngRoute', 'app.route','home.controllers', 'home.services', 'home.directives'])
})();
module.exports;

},{}],2:[function(require,module,exports){
(function() {
  'use strict';
  angular
    .module('app.route', [])
      .config(config);

    function config($routeProvider, $locationProvider, $qProvider, $sceDelegateProvider) {
      $routeProvider
        .when('/', {
          templateUrl: './assets/templates/home.html',
          controller: 'HomeController',
          controllerAs: 'vm'
        });

        $locationProvider
          .html5Mode({
            enabled: true,
            requireBase: false
          });
        $qProvider.errorOnUnhandledRejections(false);

        $sceDelegateProvider.resourceUrlWhitelist([
          'self',                    // trust all resources from the same origin
          '*://www.youtube.com/**'   // trust all resources from `www.youtube.com`
        ]);
    }
})();
module.exports;

},{}],3:[function(require,module,exports){
(function() {
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
    function createURl(data) {
      var video = [];
      data.filter(function(element) {
        element.url = 'https://www.youtube.com/embed/' + element.id.videoId + '?controls=1';
      })
      return data;
    }
})();
module.exports;

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
(function() {
  'use strict';

  angular
    .module('home.services', [])
    .factory('homeFactory', homeFactory);

  homeFactory.$inject = ['$http', '$q', '$rootScope'];

  function homeFactory($http, $q, $rootScope) {
    return {
      getVideos: getVideos,
      getVideosByName: getVideosByName,
      getVideosByCategory: getVideosByCategory
    };

    function getVideos() {
      var defered = $q.defer();

      $http.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: 'AIzaSyDePIwC37Krxpa3PStBRPIFE1gJQNG4Bwc',
          type: 'video',
          maxResults: '10',
          part: 'id,snippet'
        }
      })
      .then(getVideosComplete)
      .catch(getVideosFailed);

      function getVideosComplete(response) {
        if(response.status == 200) {
          defered.resolve(response.data);
        }
        else {
          defered.reject(response.data);
        }
      }
      function getVideosFailed(response) {
        var errorMessage = "The request failed with response: " + response.data.error.message + "and status code: " + response.status;
        defered.reject(errorMessage);
      }
      return defered.promise;
    }
    function getVideosByName(name) {
      var defered = $q.defer();

      $http.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: 'AIzaSyDePIwC37Krxpa3PStBRPIFE1gJQNG4Bwc',
          type: 'video',
          maxResults: '10',
          part: 'id,snippet',
          q: name != null ? name : ''
        }
      })
      .then(getVideosNameComplete)
      .catch(getVideosNameFailed);
      
      function getVideosNameComplete(response) {
        if(response.status == 200) {
          defered.resolve(response.data);   
        }
        else {
          defered.reject(response.data);
        }
      }
      function getVideosNameFailed(response) {
        var errorMessage = "The request failed with response: " + response.data.error.message + " and status code: " + response.status;
        defered.reject(errorMessage);
      }
      return defered.promise;
    }
    function getVideosByCategory(category) {
      var defered = $q.defer();

      $http.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: 'AIzaSyDePIwC37Krxpa3PStBRPIFE1gJQNG4Bwc',
          type: 'video',
          maxResults: '10',
          part: 'id,snippet',
          categoryId: category
        }
      })
      .then(getVideosByCategoryComplete)
      .catch(getVideosByCategoryFailed);

      function getVideosByCategoryComplete(response) {
        if(response.status == 200) {
          defered.resolve(response.data);   
        }
        else {
          defered.reject(response.data);
        }
      }
      function getVideosByCategoryFailed(response) {
        var errorMessage = "The request failed with response: " + response.data.error.message + " and status code: " + response.status;
        defered.reject(errorMessage);
      }
      return defered.promise;
    }
  }
})();

},{}],6:[function(require,module,exports){
var loadCSS = function(url)
{
  var elem = document.createElement('link');
  elem.rel = 'stylesheet';
  elem.href = url;
  document.head.appendChild(elem);
}

module.exports = loadCSS;

},{}],7:[function(require,module,exports){
$(document).ready(function() {
  $('#menu-button').on('click', function() {
    $('#menu').addClass('show-menu')
    $('#menu').removeClass('hide-menu')
  });

  $('#close-menu').on('click', function() {
    $('#menu').addClass('hide-menu')
    $('#menu').removeClass('show-menu')
  });
})

},{}],8:[function(require,module,exports){
var loadCSS = require('./javascript/lib/loadCSS');

require('./javascript/lib/navbar-menu.js');
require('./javascript/app.route.js');
require('./javascript/app.js');
require('./javascript/home/home.service.js');
require('./javascript/home/home.directive.js');
require('./javascript/home/home.controller.js');



loadCSS('https://fonts.google.com/specimen/Open+Sans?selection.family=Open+Sans');
loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css');

},{"./javascript/app.js":1,"./javascript/app.route.js":2,"./javascript/home/home.controller.js":3,"./javascript/home/home.directive.js":4,"./javascript/home/home.service.js":5,"./javascript/lib/loadCSS":6,"./javascript/lib/navbar-menu.js":7}]},{},[8]);
