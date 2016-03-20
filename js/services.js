/**
 * Created by Vadym Yatsyuk on 19/03/16
 */

var api = 'http://api.7hack.de:80/v1/';
var ericsonAPI = 'http://hack.api.uat.ebmsctogroup.com/stores-active/contentInstance/event/search'; //?query=How+I+Met+Your+Mother&numberOfResults=1000&api_key=' + ericsonKey;

angular.module('services', [])
  .factory('APIService', function($http) {
    return {
      search: function (search) {
        return $http($.extend({
          method: 'GET',
          url: api + 'videos',
          params: {
            apikey: key7TV,
            selection: '{totalCount,data{id,type,titles,descriptions,shortDescriptions,duration,status,images{id,type,url}}}',
            limit: 50
          }
        }, search))
      },

      getVideo: function (id) {
        return $http({
          method: 'GET',
          url: api + 'videos/' + id,
          params: {
            apikey: key7TV,
            selection: '{id,type,titles,descriptions,shortDescriptions,duration,status,languageVersion,productionYear,tvShow,parentalRating,episode,images{id,type,url}}'
          }
        })
      },

      getVideoURL: function (id) {
        return $http({
          method: 'GET',
          url: api + 'videos/' + id + '/url',
          params: {
            apikey: key7TV,
            format: 'mp4'
          }
        })
      },

      getEricsonData: function (query, numberOfResults) {
        return $http({
          method: 'GET',
          url: ericsonAPI,
          params: {
            api_key: ericsonKey,
            query: query,
            numberOfResults: numberOfResults || 5
          }
        })
      }
    }
  });