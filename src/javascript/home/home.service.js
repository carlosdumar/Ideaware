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
