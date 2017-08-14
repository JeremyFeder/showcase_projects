angular.module('myApp', ['ngRoute', 'ngCookies'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl : 'partials/auth/_index.html',
      controller : 'authController',
    })
    .when('/wall', {
      templateUrl : 'partials/messages/_index.html',
      controller : 'messageController',
    })
    .otherwise( {
      redirectTo : '/',
    });
  }])
