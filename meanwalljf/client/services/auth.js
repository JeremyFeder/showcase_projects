
angular.module('myApp')
   .service('AuthService', ['$cookies', '$http', function($cookies, $http) {
    this.isAuthed = function() {
      var expires = $cookies.get('expiration');

      return expires && expires > Date.now();
    };

    this.getUser = function() {
      return $http.get('/user');
    };

    this.logout = function() {
      return $http.delete('/logout/' + $cookies.get('userID'));
    };

  }]);
