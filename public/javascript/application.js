(function() {
  'use strict';

  App.controller('MainCtrl', ['$scope', 'RandomUserFactory', 'UserSession', 'API_URL',
      function($scope, RandomUserFactory, UserSession, API_URL) {
    'use strict';
    var main = this;
    main.home = API_URL;
    
    $scope.$watch( function() { return UserSession.session}, function(newVal, oldVal) {
      main.notifications = newVal;

      setTimeout(function () { 
        $scope.$apply(function() {
          main.notifications.error = null;
        });
      }, 7000);

    })

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
    main.notifications = $scope.session

  }]);

  App.controller('LoginCtrl', ['$scope','UserSession', function($scope, UserSession) {
    var login = this;

    login.username = 'Enter User name'
    login.password = '••••••••••'

    login.submit = submit;

    function submit(username, password) {

      UserSession.login(username, password).then(function success(response) {
        login.session = response.data;
        UserSession.session = response.data;
        console.log('user', login.session)

      }, handleError)

      function handleError(response) {
        UserSession.session = response.data;
        console.log('Error: ' + UserSession.session.error)
      }
    }

  }])
  
})();