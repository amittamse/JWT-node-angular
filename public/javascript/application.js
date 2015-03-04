(function() {
  'use strict';

  var App = angular.module('App', []);

  App.constant('API_URL', 'http://' + window.location.host + window.location.pathname  )

  App.factory('RandomUserFactory', function RandomUserFactory($http, API_URL) {

    function getUser() {
      return $http.get(API_URL + 'random-user')
    }
    function getCompany() {
      return $http.get(API_URL + 'random-company')
    }

    return {
      getUser: getUser,
      getCompany: getCompany
    } 

  })

  App.controller('MainCtrl', ['RandomUserFactory', 'API_URL',function(RandomUserFactory, API_URL) {
    'use strict';
    var main = this;
    main.home = API_URL;

    var getRandomUser = function() {
        RandomUserFactory.getUser().then(function success(response) {
          main.randomUser = response.data;
        })
    }

    var getRandomCompany = function() {
        RandomUserFactory.getCompany().then( function success(response) {
          main.randomCompany = response.data;
        })
    }
 
    main.getRandomUser = getRandomUser;
    main.getRandomCompany = getRandomCompany;

  }]);
  
})();