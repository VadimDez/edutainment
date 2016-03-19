/**
 * Created by Vadym Yatsyuk on 19/03/16
 */

var api = 'http://api.7hack.de:80/v1/';

angular.module('services', [])
  .factory('APIService', function($http) {
    return {
      search: function (title) {
        return $http({
          method: 'GET',
          url: api + 'videos',
          params: {
            apikey: key7TV,
            selection: '{totalCount,data{id,type,titles,descriptions,shortDescriptions,duration,status,images{id,type,url}}}',
            search: title
          }
        })
      },

      getVideo: function (id) {
        return $http({
          method: 'GET',
          url: api + 'videos/' + id,
          params: {
            apikey: key7TV,
            selection: '{id,type,titles,description,shortDescription,duration,status,images{id,type,url}}'
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
      }
    }
  });