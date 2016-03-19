/**
 * Created by Vadym Yatsyuk on 19/03/16
 */

angular.module('app', [
  'ui.router',
  'ngAria',
  'services',
  'ngVideo'
  ])
  .config(function ($urlRouterProvider, $locationProvider, $stateProvider) {

    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: 'templates/index.html',
        controller: 'IndexController'
      })
      .state('main', {
        url: '/main',
        templateUrl: 'templates/main.html',
        controller: 'MainController'
      })
      .state('information', {
        url: '/information/:id',
        templateUrl: 'templates/video-information.html',
        controller: 'InformationController'
      })
      .state('video', {
        url: '/video/:id',
        templateUrl: 'templates/video.html',
        controller: 'VideoController'
      })
      .state('post-questionnaire', {
        url: '/video/:id/post-questionnaire',
        templateUrl: 'templates/post-questionnaire.html',
        controller: 'PostQuestionnaireController'
      })
      .state('suggested-videos', {
        url: '/video/:id/suggested-videos',
        templateUrl: 'templates/suggested-videos.html',
        controller: 'SuggestedVideosController'
      });

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });
  })
  .controller('IndexController', function (APIService, $timeout, $state) {

    $timeout(function () {
      $state.go('main');
    }, 3000);
  })
  .controller('MainController', function ($scope, APIService) {

    $scope.videos = [];
    $scope.search = search;

    /**
     *
     * @param title
     */
    function search(title) {
      APIService.search(title)
        .then(function (data) {
          $scope.countVideos = data.data.response.totalCount;
          $scope.videos = data.data.response.data;
        }, function () {
          alert('issue!');
        });
    }
  })
  .controller('InformationController', function ($scope, APIService, $stateParams) {
    $scope.video = null;

    APIService.getVideo($stateParams.id)
      .then(function (response) {
        $scope.video = response.data.response;
      });
  })
  .controller('VideoController', function ($scope, APIService, $stateParams, video) {
    $scope.video = null;
    $scope.videoURL = null;

    APIService.getVideo($stateParams.id)
      .then(function (response) {
        $scope.video = response.data.response;
        console.log($scope.video);
      });

    APIService.getVideoURL($stateParams.id)
      .then(function (response) {
        
        $scope.url = response.data.response.sources[0];
        video.addSource('mp4', response.data.response.sources[0].url);
      })
  })
  .controller('PostQuestionnaireController', function ($scope, APIService) {

  })
  .controller('SuggestedVideosController', function ($scope, APIService) {
    
  });