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
