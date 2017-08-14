angular.module('myApp')
  .controller('messageController',
    ['$scope','$location','AuthService', 'messageFactory', 'commentFactory',
      function($scope, $location, auth, messageFactory, commentFactory) {

        if(!auth.isAuthed()) {
          console.log('Not Authorized');
          return $location.path('/');
        }

        $scope.logout = function() {
          auth.logout()
            .then(function(response) {
              $location.path('/');
            })
            .catch(function(error) {
              console.log(error);
            });
        };

        $scope.messages = messageFactory.messages;

        $scope.index = function() {
          messageFactory.index();
        }

        $scope.getUser = function() {
          auth.getUser()
            .then(function(response) {
              $scope.userName = response.data.user.name.first + " " + response.data.user.name.last;
            })
            .catch(function(error) {
              console.log(error);
            });
        }();

        $scope.addMessage = function() {
          messageFactory.create($scope.newMessage);
          $scope.newMessage = '';
        }

        //delete message functionality??

        $scope.addComment = function(messageID) {
          var message = $scope.messages.find(function(message) {
            return message._id === messageID;
          });
          if(message) {
            //pass scope.index to rebuild page after creating comment
            commentFactory.createComment(messageID, message.newComment, $scope.index);
            message.newComment = '';
          }
        }

        //delete comment     WORKS!!
        $scope.deleteComment = function(commentID, messageID) {
          console.log("got to controller", commentID, messageID);
          commentFactory.deleteComment(commentID)
            .then(function(res) {
              console.log("got past then statement in factory");
              for(var index = 0; index < $scope.messages.length; index++) {
                if($scope.messages[index]._id === messageID) {
                  for(var idx = 0; idx < $scope.messages[index]._comments.length; idx++) {
                    if($scope.messages[index]._comments[idx]._id === commentID) {
                      return $scope.messages[index]._comments.splice(idx, 1);
                    }
                  }
                }
              }
            })
            .catch(console.log)
        }


        $scope.getComments = function(messageID) {
          var message = $scope.messages.find(function(message) {
            return message._id === messageID;
          });
          if(message) {
            commentFactory.getComments(messageID, function(comments) {
              message._comments = comments;
            });
          }
        };

      }
    ]
  )
