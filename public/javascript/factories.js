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

App.factory('AuthTokenStore', function AuthTokenStore($window) {
  'use strict';

  var store = $window.localStorage;
  var key = 'auth-token';

  return {
    getToken: getToken,
    setToken: setToken
  }

  function  getToken() {
    return store.getItem(key);
  }

  function setToken(token) {
    if(token) {
      store.setItem(key, token)
    } else {
      store.removeItem(key); 
    }
  }
})


App.factory('UserSession', function UserSession($http, API_URL, AuthTokenStore) {

  var state = {
    login: login,
    logout: logout,
    session: { error: null },
    user: null
  }

  function login(username, password) {
    return $http.post(API_URL + 'login', {
      username: username,
      password: password
    })
    .then(function success(response) {
      console.log('token', response.data.token )
      AuthTokenStore.setToken(response.data.token);
      return response;
    })
  }

  function logout() {
    AuthTokenStore.setToken();
  }
  
  return state;
})


App.factory('AuthInterceptor', function AuthInterceptor(AuthTokenStore) {
  'use strict';
  return {
    request: AddToken
  }

  function AddToken(config) {
    var token = AuthTokenStore.getToken()
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  }
})

App.config( function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})
