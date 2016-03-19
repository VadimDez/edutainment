/**
 * Created by Vadym Yatsyuk on 19/03/16
 */

angular.module('app', [
  'ui.router',
  'ngAria',
  'services'
  ])
  .config(function ($urlRouterProvider, $locationProvider, $stateProvider) {

    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: 'templates/index.html',
        controller: 'IndexController'
      })
      .state('video', {
        url: '/video/:id',
        templateUrl: 'templates/video.html',
        controller: 'VideoController'
      });

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .controller('IndexController', function (APIService) {
    console.log(APIService);
  })
  .controller('VideoController', function () {

  });