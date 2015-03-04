(function() {
  'use strict';

  App.controller('MainCtrl', ['RandomUserFactory', 'UserSession', 'API_URL',function(RandomUserFactory, UserSession, API_URL) {
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

  App.controller('LoginCtrl', ['UserSession', function(UserSession) {
    var login = this;

    login.username = 'Enter User name'
    login.password = '••••••••••'

    login.submit = submit;

    function submit(username, password) {
      UserSession.login().then(function success(response) {
        login.session = response.data;
      }, handlerError)

      function handleError(response) {
        console.log('Error' + response.data)
      }
    }



  }])
  
})();