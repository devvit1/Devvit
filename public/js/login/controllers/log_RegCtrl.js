angular.module('devvit').controller('log_RegCtrl', function($scope, log_RegService, $rootScope){

  $scope.login = function(email, password){
    log_RegService.login(email, password).then(function(data) {
      $scope.email = "";
      $scope.password = "";
      $scope.updateUser();
    }, function(err){
      console.log('log ctrl err: ', err);
    })

  }
  
  	$scope.updateUser = function  (){
		log_RegService.getProfile().then(function(res){
			console.log("user should be set", res._id)
			$rootScope.profile = res;
			$rootScope.profile.username = res.basicInfo.userName; 
			console.log("rootScope - ", $rootScope.profile )

		})
		}

  $scope.createNewUser = function (newUser){
    log_RegService.createNewUser(newUser)
  }

})
