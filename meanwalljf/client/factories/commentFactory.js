angular.module('myApp')
  .factory('commentFactory',['$http',function($http) {

    const factory = {};

    factory.comments = [];

    factory.createComment = function(messageID, comment, callback) {
      $http.post('/comments', {messageID : messageID, comment : comment})
        .then(function(response) {
          callback();
        })
        .catch(console.log);
    }

    factory.getComments = function(messageID, callback) {
      $http.get('/comments/'+messageID)
        .then(function(response) {
          callback(response.data);
        })
        .catch(console.log);
    };


    // DELETE Function
    factory.deleteComment = function(id){
      return $http.delete(`/comments/${id}`)
    };

    return factory;
  }]);
