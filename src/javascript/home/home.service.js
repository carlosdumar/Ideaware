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
      return $http.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: 'AIzaSyDePIwC37Krxpa3PStBRPIFE1gJQNG4Bwc',
          type: 'video',
          maxResults: '10',
          part: 'id,snippet'
        }
      })
        .then(getVideosComplete)
        .catch(getVideosFailed);

        function getVideosComplete(response, status, headers, config) {
          return response.data;
        }
        function getVideosFailed(data, status, headers, config) {
          var errorMessage = "The request failed with response" + data + "and status code: " + status;
          return errorMessage;
        }
    }
    function getVideosByName(name) {
      return $http.get('https://www.googleapis.com/youtube/v3/search', {
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

      function getVideosNameComplete(response, status, headers, config) {
        return response.data;
      }
      function getVideosNameFailed(data, status, headers, config) {
        var errorMessage = "The request failed with response" + data + "and status code: " + status;
        return errorMessage;
      }
    }
    function getVideosByCategory(category) {
      return $http.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: 'AIzaSyDePIwC37Krxpa3PStBRPIFE1gJQNG4Bwc',
          type: 'video',
          maxResults: '10',
          part: 'id,snippet',
          categoryId: 10
        }
      })
      .then(getVideosByCategoryComplete)
      .catch(getVideosByCategoryFailed);

      function getVideosByCategoryComplete(response, status, headers, config) {
        return response.data;
      }
      function getVideosByCategoryFailed(data, status, headers, config) {
        var errorMessage = "The request failed with response" + data + "and status code: " + status;
        return errorMessage;
      }
    }
  }
})();
