angular.module('myApp')
  .service('UserService',['$http', function($http) {
    this.login = function(user) {
      return $http.post('/login', user);
    };

    this.register = function(user, passwordConf) {
      // passes in user and pw in a single object
      return $http.post('/register', { user : user, passwordConf : passwordConf});
    };

  }]);
