


(function() {
  'use strict';

  angular
    .module('robbi')
    .config(routerConfig);

  /** @ngInject */

  function routerConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/signing/:participantHash',
        templateUrl: 'app/main/main.html',
        controller: function ($stateParams) {
          $stateParams.participantHash   // participantHash now exists
        },
        resolve:{
          participantHash: ['$stateParams', function($stateParams){
            return $stateParams.participantHash;
          }]
        },
        controllerAs: 'main'
      });

    $stateProvider
      .state('intro', {
        url: '/',
        templateUrl: 'app/main/landing.html',
        controller: 'MainController',
        controllerAs: 'main'
      });

    $stateProvider
      .state('disclosures', {
        url: '/disclosures',
        templateUrl: 'app/main/disclosures.html',
        controller: 'MainController',
        controllerAs: 'main'
      });

    $urlRouterProvider.otherwise('/');

    }

})();

   





    //url is technically /#/signing due to not the hash-bang that Angular adds by default
    // enable HTML5mode to disable hashbang urls
    // $locationProvider.html5Mode(true);


    // Note: $stateParams service must be specified as a state controller, and it will be scoped so only the relevant parameters defined in that state are available on the service object.
    // https://github.com/angular-ui/ui-router/wiki/URL-Routing

