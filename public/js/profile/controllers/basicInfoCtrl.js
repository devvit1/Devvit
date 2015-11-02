angular.module('devvit').controller('basicInfoCtrl', function($scope, basicInfoService, $rootScope){
	
	$scope.addProfile = function(data){
		basicInfoService.addProfile(data)
	}
	
	// once for firebase
	// $scope.addProfile($rootScope.profile)
	$scope.getProfile('-K23dvpqpIHrkMR4j2SV')
	
})