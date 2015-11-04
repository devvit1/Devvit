angular.module('devvit').controller('basicInfoCtrl', function($scope, basicInfoService, $rootScope){
	$scope.editmode = false;
  	$scope.toggleEditMode = function(){
    	$scope.editmode = $scope.editmode === false ? true: false;
    	
  }
	
	// $scope.addProfile = function(data){
	// 	basicInfoService.addProfile(data)
	// }
	
	// // once for firebase
	// // $scope.addProfile($rootScope.profile)
	
	$scope.getProfile = function(active_user_id){
		console.log(1, active_user_id);
		basicInfoService.getProfile(active_user_id).then(
		function(res){
			$scope.first = res.basicInfo.firstName;
			$scope.last = res.basicInfo.lastName;
			$scope.userName = res.basicInfo.userName;
			$scope.email = res.basicInfo.email;
			$scope.password = res.basicInfo.password;
			$scope.profile = res;
			console.log(11, $scope.profile)
			
		}
	)
	}
	($rootScope.profile._id)
	

	$scope.updateProfile = function(profile) {
		
			
		console.log(profile);
		basicInfoService.updateProfile(profile).then(function(res) {
			console.log('Updated Profile', res);
		})
	}
	// function editProfile($scope) {
	// 	$scope.firstName = $scope.profile.firstName;
	// 	$scope.lastName = $scope.profile.lastName
	// }
	
});


