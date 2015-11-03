angular.module('devvit').controller('log_RegCtrl', function($scope, log_RegService, $timeout){
  $scope.error = false;
  $scope.success = false;
  $scope.login = function(user){
    log_RegService.login(user)

  }

  $scope.createNewUser = function (newUser){
    log_RegService.createNewUser(newUser).then(function(response){
      console.log(response)
      // if (response.data.errmsg === "E11000 duplicate key error index: devvit.users.$basicInfo.userName_1 dup key:"){
      //   $scope.error = true;
      //   $timeout(function(){
      //     $scope.error = false;
      //   }, 3000)
      if (response.status !== 200){
        $scope.error = true;
        $timeout(function(){
          $scope.error = false;
        }, 3000)
      } else if (response.status === 200){
        $scope.error = false;
        $scope.success = true;
        $timeout(function(){
          $scope.success = false;
        }, 3000)
      }
    })
  }

})
