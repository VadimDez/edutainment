/**
 * Created by Vadym Yatsyuk on 19/03/16
 */
var video;

function getMinutes(minutes) {
  if (!minutes) {
    return '';
  }

  return parseInt(minutes / 60000, 10) + ' Min';
}

angular.module('app', [
  'ui.router',
  'ngAria',
  'services',
    "ngSanitize",
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls",
    "com.2fdevs.videogular.plugins.overlayplay",
    "com.2fdevs.videogular.plugins.poster"
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
      .state('prequestionnaire', {
        url: '/pre-questionnaire/:id',
        templateUrl: 'templates/pre-questionnaire.html',
        controller: 'PrequestionnaireController'
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

    $scope.videos = null;
    $scope.search = search;
    $scope.getMinutes = getMinutes;
    $scope.showMin = 0;
    $scope.showMax = 5;

    $scope.prev = prev;
    $scope.next = next;


    APIService.search({
        search: 'galileo 360',
        limit: 24
      })
      .then(function (data) {
        $scope.suggestionCountVideos = data.data.response.totalCount;
        $scope.suggestionVideos = data.data.response.data;
      }, function () {
        alert('issue!');
      });

    /**
     *
     * @param title
     */
    function search(title) {
      APIService.search({
          search: title
        })
        .then(function (data) {

          if (title.toLowerCase() === 'japan') {
            APIService.getVideo(3606990)
              .then(function (videoData) {
                $scope.countVideos = data.data.response.totalCount + 1;
                data.data.response.data[2] = videoData.data.response;
                $scope.videos = data.data.response.data;
              })
          } else {
            $scope.countVideos = data.data.response.totalCount;
            $scope.videos = data.data.response.data;
          }
        }, function () {
          alert('issue!');
        });
    }

    function prev() {
      var r = $scope.showMin - 1;
      $scope.showMin = (r < 0) ? 0 : r;
      r = $scope.showMax - 1;
      $scope.showMax = (r < 5) ? 5 : r;
    }

    function next() {
      var r = $scope.showMax + 1;
      $scope.showMax = (r > $scope.countVideos) ? $scope.countVideos : r;
      r = $scope.showMin + 1;
      $scope.showMin = (r > ($scope.countVideos - 5)) ? $scope.countVideos - 5 : r;
    }
  })
  .controller('InformationController', function ($scope, APIService, $stateParams) {
    $scope.video = null;
    $scope.getMinutes = getMinutes;
    $scope.getTitle = function (titles) {
      if (!titles)
        return '';


      return titles[Object.keys(titles)[0]];
    }

    APIService.getVideo($stateParams.id)
      .then(function (response) {
        $scope.video = response.data.response;


        APIService.getEricsonData($scope.video.titles.default, 6)
          .then(function (ericsonData) {
            $scope.ericsonData = ericsonData.data;

            if (response.data.response.id == 3606990) {
              $scope.ericsonData[0].document.relatedMaterial = {
                0: {
                  value: 'https://i1.ytimg.com/sh/fN_BRKR-jaw/showposter.jpg?v=50b360d4'
                }
              };
              $scope.ericsonData[1].document.relatedMaterial = {
                0: {
                  value: 'https://i1.ytimg.com/sh/fN_BRKR-jaw/showposter.jpg?v=50b360d4'
                }
              };
              $scope.ericsonData[2].document.relatedMaterial = {
                0: {
                  value: 'http://www.madman.com.au/wallpapers/sengoku_basara_-_samurai__643_1680.jpg'
                }
              };
              $scope.ericsonData[3].document.relatedMaterial = {
                0: {
                  value: 'http://cdn.madman.com.au/images/series/15834-series-header.jpg'
                }
              };
              $scope.ericsonData[4].document.relatedMaterial = {
                0: {
                  value: 'http://statici.behindthevoiceactors.com/behindthevoiceactors/_img/shows/banner_862.jpg'
                }
              };
              $scope.ericsonData[5].document.relatedMaterial = {
                0: {
                  value: 'http://keyconversationsradio.com/wp-content/uploads/2010/09/webshot.jpg'
                }
              }
            }
          })
      });

  })
  .controller('PrequestionnaireController', function ($scope, APIService, $state, $stateParams) {
    $scope.questionN = 1;

    $scope.goToVideo = function () {
      $state.go('video', {id: $stateParams.id});
    }
  })
  .controller('VideoController', function ($scope, APIService, $stateParams, $timeout, $sce, $state) {
    $scope.video = null;
    $scope.videoURL = null;
    $scope.CURRENT_TIME = null;
    video = null;

    $scope.onComplete = function () {
      $timeout(function () {
        $state.go('post-questionnaire', {id: $scope.video.id});
      }, 1000);
    };

    $scope.onPlayerReady = function (API) {
      console.log(API);

      $timeout(function () {
        $('[ng-class="fullscreenIcon"]').trigger('click');
      }, 1000);
    };

    APIService.getVideo($stateParams.id)
      .then(function (response) {
        video = response.data.response;
        $scope.video = response.data.response;

        APIService.getVideoURL($stateParams.id)
          .then(function (response) {

            $scope.url = response.data.response.sources[0];

            $scope.config = {
              sources: [
                {src: $sce.trustAsResourceUrl(response.data.response.sources[0].url), type: "video/mp4"}
              ],
              tracks: [],
              theme: "/bower_components/videogular-themes-default/videogular.css",
              // plugins: {
                // poster: "http://www.videogular.com/assets/images/videogular.png"
              // }
            };
          });

      });

  })
  .controller('PostQuestionnaireController', function ($scope, $state, $stateParams) {
    $scope.questionN = 1;

    $scope.goToSuggested = function () {
      $state.go('suggested-videos', {id: $stateParams.id})
    }
    
  })
  .controller('SuggestedVideosController', function ($scope, APIService, $state, $stateParams) {
    $scope.goToInitial = goToInitial;
    $scope.goBack = goBack;

    $scope.getMinutes = getMinutes;


    APIService.search({
      search: 'Japan',
      limit: 6
    }).then(function (data) {
      $scope.countVideos = data.data.response.totalCount;
      $scope.videos = data.data.response.data;
    });

    function goBack() {
      $state.go('video', {id: $stateParams.id})
    }

    function goToInitial() {
      $state.go('main');
    }
  });