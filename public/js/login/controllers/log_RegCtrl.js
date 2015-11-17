angular.module('devvit').controller('log_RegCtrl', function($scope, $state, log_RegService, $rootScope){

  $scope.login = function(email, password){
    log_RegService.login(email, password).then(function(data) {
      $state.go('devvit.profile');
      $scope.email = "";
      $scope.password = "";
      $scope.updateUser();
    }, function(err){
      console.log('log ctrl err: ', err);
    })

  }
  
  	$scope.updateUser = function  (){
		log_RegService.getProfile().then(function(res){
			$rootScope.profile = res;
			$rootScope.profile.username = res.basicInfo.userName; 
		})
		}

  $scope.createNewUser = function (newUser){
    log_RegService.createNewUser(newUser)
  }

})
