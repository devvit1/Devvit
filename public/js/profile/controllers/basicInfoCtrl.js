angular.module('devvit').controller('basicInfoCtrl', function($scope, basicInfoService, $rootScope){
	
	// $scope.addProfile = function(data){
	// 	basicInfoService.addProfile(data)
	// }
	
	// // once for firebase
	// // $scope.addProfile($rootScope.profile)
	
	(function getProfile(active_user_id){
		basicInfoService.getProfile(active_user_id).then(
		function(res){
			$scope.profile = res.basicInfo;
		}
	)
	})($rootScope.profile._id)
	

	
})