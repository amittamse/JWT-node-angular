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


App.factory('UserSession', function UserSession($http, API_URL) {

  return {
    login: login
  }

  function login(username, passrod) {
    return $http.post(API_URL + '/login', {
      username: username,
      password: password
    })
  }

})
