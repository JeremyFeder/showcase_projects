angular.module('myApp')
  .factory('messageFactory',['$http',function($http) {

    const factory = {};

    factory.messages = [];

    factory.index = function() {
      $http.get('/messages')
        .then(function(response) {
          Object.assign(factory.messages, response.data);
          console.log(factory.messages);
        })
        .catch(console.log);
    };

    factory.create = function(message, user){
      $http.post('/messages', {message : message})
        .then(function(response) {
          factory.index();
        })
        .catch(console.log);
    };

    //Need to add Delete and Update capabilities??

    return factory;
  }]);
