angular.module('myApp')
  .controller('authController',
    ['$scope','$location','UserService','AuthService',
      function($scope, $location, userService, auth) {

        $scope.errors = [];

        if(auth.isAuthed()) {
          return $location.path('/wall');
        }

        //BEGIN REGISTER ***********************
        $scope.register = function() {

          $scope.errors = [];

          userService.register($scope.newUser, $scope.passwordConf)
            .then(function(response) {
                if(response.data.success) {
                  $location.path('/wall');
                }
                else {
                  //empty password field
                  if($scope.newUser !== undefined) {
                    $scope.newUser.password = '';
                    $scope.passwordConf = '';
                  }

                  if(response.data.errorMessage) {
                    $scope.errors.push({ errorType: 'registration', errorMessage: response.data.errorMessage });
                  }
                  else if (response.data.error) {
                    for (errorName in response.data.error) {
                      $scope.errors.push({ errorType: 'registration', errorMessage: response.data.error[errorName].message });
                    }
                  }
                }
            })
            .catch(function(error) {
              console.log('Register error:', error);
            });
        };
        //END REGISTER ***************************

        //BEGIN LOGIN +++++++++++++++++++++++++
        $scope.login = function() {

          $scope.errors = [];

          userService.login($scope.user)
            .then(function(response){
              if(response.data.success) {
                $location.path('/wall');
              }
              else {
                //empty password field
                if($scope.user !== undefined) {
                  $scope.user.password = '';
                }

                $scope.errors.push({ errorType: 'login', errorMessage: response.data.errorMessage });
              }
            })
            .catch(function(error) {
              console.log('Login error:', error);
            });
        };
        //END LOGIN ++++++++++++++++++++++++++++
      }
    ]
  )
