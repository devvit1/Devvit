angular.module('devvit').controller('log_RegCtrl', function($scope, log_RegService){

  $scope.login = function(email, password){
    log_RegService.login(email, password).then(function(data) {
      $scope.email = "";
      $scope.password = "";
    }, function(err){
      console.log('log ctrl err: ', err);
    })

  }

  $scope.createNewUser = function (newUser){
    log_RegService.createNewUser(newUser)
  }

})
